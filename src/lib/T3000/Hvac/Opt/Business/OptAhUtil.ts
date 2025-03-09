

import T3Gv from "../../Data/T3Gv";
import Instance from "../../Data/Instance/Instance";
import ConstantData from '../../Data/ConstantData'

class BisUtil {

  /**
   * Retrieves the global business manager instance
   * @param selectionObject - The selection object (unused in current implementation)
   * @param options - Additional options (unused in current implementation)
   * @returns The global business manager instance
   */
  static GetSelectionBusinessManager(selectionObject, options) {
    return T3Gv.gBusinessManager;
  }

  /**
   * Finds the top element of a tree structure in the drawing hierarchy
   * @param drawingObject - The drawing object to evaluate
   * @param setLinkFlag - Whether to set link flags during traversal
   * @param result - Object to store the results of the tree traversal
   * @returns Boolean indicating whether a tree structure was found
   */
  static FindTreeTop(drawingObject, setLinkFlag, result) {
    if (!drawingObject) {
      return result.foundtree;
    }

    // Skip line objects
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
      return false;
    }

    // Process based on object type
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
      result.topconnector = drawingObject.BlockID;
      result.foundtree = true;

      if (setLinkFlag) {
        T3Gv.optManager.SetLinkFlag(drawingObject.BlockID, setLinkFlag);
      }
    } else {
      result.topshape = drawingObject.BlockID;

      if (result.level != null) {
        result.level++;
      }

      if (setLinkFlag) {
        T3Gv.optManager.SetLinkFlag(drawingObject.BlockID, setLinkFlag);
      }
    }

    // Process hooks if available
    if (drawingObject.hooks.length) {
      // Handle self-referencing hooks
      if (drawingObject.hooks[0].objid === drawingObject.BlockID) {
        drawingObject.hooks.splice(0, 1);
      } else {
        const childObject = T3Gv.optManager.GetObjectPtr(drawingObject.hooks[0].objid, false);
        if (childObject) {
          this.FindTreeTop(childObject, setLinkFlag, result);
        }
      }
    } else if (result.foundtree) {
      // Handle connector objects after tree is found
      if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
        const childArrayId = T3Gv.optManager.FindChildArray(result.topshape, -1);
        if (childArrayId >= 0) {
          result.secondconnector = childArrayId;
        }
      }
    } else {
      // Find child arrays if tree not yet found
      const childArrayId = T3Gv.optManager.FindChildArray(drawingObject.BlockID, -1);
      if (childArrayId >= 0) {
        result.topconnector = childArrayId;
        result.foundtree = true;

        if (setLinkFlag) {
          T3Gv.optManager.SetLinkFlag(childArrayId, setLinkFlag);
        }
      }
    }

    return result.foundtree;
  }

  /**
   * Selects the parent container of an object if applicable
   * @param objectId - The ID of the object to check
   * @returns The ID of the parent container if available, otherwise returns the original object ID
   */
  static SelectContainerParent(objectId) {
    const object = T3Gv.optManager.GetObjectPtr(objectId, false);

    return object &&
      object instanceof Instance.Shape.ShapeContainer &&
      object.hooks.length &&
      object.hooks[0].cellid != null ? object.hooks[0].objid : objectId;
  }

  /**
   * Determines if a shape cannot have action buttons
   * @param shape - The shape to evaluate
   * @returns Boolean indicating whether the shape cannot have action buttons
   */
  static ShapeCannotHaveActionButtons(shape) {
    // return !!shape.IsSwimlane();
    return true;
  }

  /**
   * Navigates to the next logical object to select based on the current selection
   * @returns The ID of the next object to select, or -1 if no suitable next selection is found
   */
  static GetNextSelect() {
    const currentSelectedId = T3Gv.optManager.GetTargetSelect();
    const currentListSelection = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, false);
    let nextSelection = -1;

    if (currentSelectedId >= 0) {
      const currentObject = T3Gv.optManager.GetObjectPtr(currentSelectedId, false);

      if (currentObject && currentObject.hooks.length) {
        const childId = currentObject.hooks[0].objid;
        const childObject = T3Gv.optManager.GetObjectPtr(childId, false);

        if (childObject && childObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
          // Handle flow chart connectors
          if (childObject._IsFlowChartConnector()) {
            return -1;
          }

          // Special handling for cause-effect branches
          if (currentObject.hooks[0].connect.x < 0 &&
            childObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH) {

            if (childObject.hooks.length) {
              const grandChildObject = T3Gv.optManager.GetObjectPtr(childObject.hooks[0].objid, false);
              if (grandChildObject && grandChildObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
                nextSelection = BisnUtil.GetConnectorNextSelect(grandChildObject, childObject.BlockID, currentListSelection);
              }
            }
          }
          // Handle genogram branches
          else if (childObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH) {
            // return gGenogramManager.GetNextSelect();
          } else {
            nextSelection = BisnUtil.GetConnectorNextSelect(childObject, currentSelectedId, currentListSelection);
          }
        }
        // Handle container shapes
        else if (childObject && childObject instanceof Instance.Shape.ShapeContainer) {
          const containerList = childObject.ContainerList;
          const listItems = containerList.List;
          const isSparse = containerList.flags & ConstantData.ContainerListFlags.Sparse;
          const itemCount = listItems.length;
          let currentIndex = -1;

          // Find the current index in the container list
          for (let i = 0; i < itemCount; i++) {
            if (listItems[i].id === currentSelectedId) {
              currentIndex = i;
              break;
            }
          }

          if (isSparse) {
            // Try navigation methods for sparse containers
            // nextSelection = gContainerManager.NavUpDown(true, true);

            if (nextSelection < 0) {
              // nextSelection = gContainerManager.NavUpDown(false, true);
            }

            if (nextSelection >= 0) {
              return nextSelection;
            }

            // Sequential search if navigation methods failed
            if (nextSelection < 0) {
              // Search backwards
              for (let i = currentIndex - 1; i >= 0; i--) {
                if (listItems[i].id >= 0) {
                  return listItems[i].id;
                }
              }

              // Search forwards
              for (let i = currentIndex + 1; i < itemCount; i++) {
                if (listItems[i].id >= 0) {
                  return listItems[i].id;
                }
              }
            }
          } else {
            // Simple navigation for non-sparse containers
            if (currentIndex >= 0) {
              if (currentIndex > 0) {
                nextSelection = listItems[currentIndex - 1].id;
              } else if (itemCount > 1) {
                nextSelection = listItems[currentIndex + 1].id;
              }
            }
          }
        }
        return nextSelection;
      }

      // Handle child arrays
      const childArrayId = T3Gv.optManager.FindChildArray(currentSelectedId, -1);
      if (childArrayId >= 0) {
        const childArray = T3Gv.optManager.GetObjectPtr(childArrayId, false);
        // if (childArray.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH) {
        //   return gGenogramManager.GetNextSelect();
        // }
      }
    }
    return nextSelection;
  }

  /**
   * Retrieves the parent connector object for a given object
   * @param objectId - The ID of the object to find the parent connector for
   * @param positionOut - Optional object to receive connection position coordinates
   * @returns The ID of the parent connector, or -1 if not found
   */
  static GetParentConnector(objectId, positionOut) {
    let connectorId = -1;
    const object = T3Gv.optManager.GetObjectPtr(objectId, false);

    if (object && object.hooks.length) {
      const parentId = object.hooks[0].objid;

      if (parentId >= 0) {
        const parentObject = T3Gv.optManager.GetObjectPtr(parentId, false);

        if (parentObject &&
          parentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
          connectorId = parentId;

          if (positionOut) {
            positionOut.x = object.hooks[0].connect.x;
            positionOut.y = object.hooks[0].connect.y;
          }
        }
      }
    }

    return connectorId;
  }

  /**
   * Checks if an object has a container as its parent
   * @param object - The object to check
   * @returns The ID of the container parent if it exists, otherwise false
   */
  static HasContainerParent(object) {
    if (object && object.hooks.length) {
      const parentId = object.hooks[0].objid;
      const parentObject = T3Gv.optManager.GetObjectPtr(parentId, false);

      if (parentObject && parentObject instanceof Instance.Shape.ShapeContainer) {
        return parentId;
      }
    }
    return false;
  }
}

export default BisUtil
