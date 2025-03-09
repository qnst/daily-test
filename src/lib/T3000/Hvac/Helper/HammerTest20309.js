(function (e, t) {
  "use strict";
  var n = function e(t, n) {
    return new e.Instance(t, n || {});
  };
  (n.defaults = {
    behavior: {
      userSelect: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)",
    },
  }),
    (n.DOCUMENT = document),
    (n.CALCULATE_INTERVAL = 25);
  var i111 = {},
    o111 = (n.DIRECTION_DOWN = "down"),
    r111 = (n.DIRECTION_LEFT = "left"),
    a111 = (n.DIRECTION_UP = "up"),
    s111 = (n.DIRECTION_RIGHT = "right"),
    c111 = (n.POINTER_MOUSE = "mouse"),
    l111 = (n.POINTER_TOUCH = "touch"),
    u111 = (n.POINTER_PEN = "pen"),
    p111 = (n.EVENT_START = "start"),
    h111 = (n.EVENT_MOVE = "move"),
    d111 = (n.EVENT_END = "end"),
    m111 = (n.EVENT_RELEASE = "release"),
    f111 = (n.EVENT_TOUCH = "touch");
  (n.READY = !1), (n.gestures = n.gestures || {}), (n.classType = "Hammer");
  var g,
    y,
    v = (n.utils = {
      classType: "Utils",
      extend: function (e, n, i) {
        for (var o in n)
          !n.hasOwnProperty(o) || (e[o] !== t && i) || (e[o] = n[o]);
        return e;
      },
      on: function (e, t, n) {
        e.addEventListener(t, n, !1);
      },
      off: function (e, t, n) {
        e.removeEventListener(t, n, !1);
      },
      each: function (e, n, i) {
        var o, r;
        if ("forEach" in e) e.forEach(n, i);
        else if (e.length !== t) {
          for (o = 0, r = e.length; o < r; o++)
            if (!1 === n.call(i, e[o], o, e)) return;
        } else
          for (o in e)
            if (e.hasOwnProperty(o) && !1 === n.call(i, e[o], o, e)) return;
      },
      inStr: function (e, t) {
        return e.indexOf(t) > -1;
      },
      inArray: function (e, t) {
        if (e.indexOf) {
          var n = e.indexOf(t);
          return -1 !== n && n;
        }
        for (var i = 0, o = e.length; i < o; i++) if (e[i] === t) return i;
        return !1;
      },
      inGestureArray: function (e, t) {
        for (var n = 0, i = e.length; n < i; n++)
          if (e[n].gesture == t.gesture) return n;
        return !1;
      },
      toArray: function (e) {
        return Array.prototype.slice.call(e, 0);
      },
      hasParent: function (e, t) {
        for (; e;) {
          if (e == t) return !0;
          e = e.parentNode;
        }
        return !1;
      },
      getCenter: function (e) {
        var t = [],
          n = [],
          i = [],
          o = [],
          r = Math.min,
          a = Math.max;
        return 1 === e.length
          ? {
            pageX: e[0].pageX,
            pageY: e[0].pageY,
            clientX: e[0].clientX,
            clientY: e[0].clientY,
          }
          : (v.each(e, function (e) {
            t.push(e.pageX),
              n.push(e.pageY),
              i.push(e.clientX),
              o.push(e.clientY);
          }),
          {
            pageX: (r.apply(Math, t) + a.apply(Math, t)) / 2,
            pageY: (r.apply(Math, n) + a.apply(Math, n)) / 2,
            clientX: (r.apply(Math, i) + a.apply(Math, i)) / 2,
            clientY: (r.apply(Math, o) + a.apply(Math, o)) / 2,
          });
      },
      getVelocity: function (e, t, n) {
        return {
          x: Math.abs(t / e) || 0,
          y: Math.abs(n / e) || 0,
        };
      },
      getAngle: function (e, t) {
        var n = t.clientX - e.clientX,
          i = t.clientY - e.clientY;
        return (180 * Math.atan2(i, n)) / Math.PI;
      },
      getDirection: function (e, t) {
        return Math.abs(e.clientX - t.clientX) >=
          Math.abs(e.clientY - t.clientY)
          ? e.clientX - t.clientX > 0
            ? r
            : s
          : e.clientY - t.clientY > 0
            ? a
            : o;
      },
      getDistance: function (e, t) {
        var n = t.clientX - e.clientX,
          i = t.clientY - e.clientY;
        return Math.sqrt(n * n + i * i);
      },
      getScale: function (e, t) {
        return e.length >= 2 && t.length >= 2
          ? this.getDistance(t[0], t[1]) / this.getDistance(e[0], e[1])
          : 1;
      },
      getRotation: function (e, t) {
        return e.length >= 2 && t.length >= 2
          ? this.getAngle(t[1], t[0]) - this.getAngle(e[1], e[0])
          : 0;
      },
      isVertical: function (e) {
        return e == a || e == o;
      },
      setPrefixedCss: function (e, t, n, i) {
        var o = [""];
        t = v.toCamelCase(t);
        for (var r = 0; r < o.length; r++) {
          var a = t;
          if (
            (o[r] && (a = o[r] + a.slice(0, 1).toUpperCase() + a.slice(1)),
              a in e.style)
          ) {
            e.style[a] = ((null == i || i) && n) || "";
            break;
          }
        }
      },
      toggleBehavior: function (e, t, n) {
        if (t && e && e.style) {
          v.each(t, function (t, i) {
            v.setPrefixedCss(e, i, t, n);
          });
          var i =
            n &&
            function (e) {
              var t = e.target || e.srcElement;
              return !(!t || "textarea" != t.localName);
            };
          "none" == t.userSelect && (e.onselectstart = i),
            "none" == t.userDrag && (e.ondragstart = i);
        }
      },
      toCamelCase: function (e) {
        return e.replace(/[_-]([a-z])/g, function (e) {
          return e[1].toUpperCase();
        });
      },

      inWorkAreaScrollbar: function (t) {
        if (!e.docUtil) {
          return false;
        }
        var n = document.getElementById('svg-area'),
          i = n[0];
        if (t.currentTarget == i) {
          var overflowX = n.css("overflow-x"),
            overflowY = n.css("overflow-y");
          if ("scroll" === overflowX) {
            var offsetY = t.clientY - n.offset().top;
            if (t.currentTarget.clientHeight - offsetY <= 0) {
              return true;
            }
          }
          if ("scroll" === overflowY) {
            var offsetX = t.clientX - n.offset().left;
            if (t.currentTarget.clientWidth - offsetX <= 0) {
              return true;
            }
          }
        }
        return false;
      },
    }),
    b = (n.event = {
      classType: "Event",
      started: !1,
      shouldDetect: !1,
      on: function (e, t, n, i) {
        var o = t.split(" ");
        v.each(o, function (t) {
          v.on(e, t, n), i && i(t);
        });
      },
      off: function (e, t, n, i) {
        var o = t.split(" ");
        v.each(o, function (t) {
          v.off(e, t, n), i && i(t);
        });
      },
      onTouch: function (t, n, o) {
        var r = this;
        var a = function (i) {
          var a;
          if (e.docUtil && n == p111 && v.inWorkAreaScrollbar(i)) {
            return;
          }
          if (n == p111) {
            r.shouldDetect = true;
          }
          if (n != d && r.shouldDetect) {
            S.updatePointer(n, i);
          }
          if (r.shouldDetect) {
            a = r.doDetect.call(r, i, n, t, o, 0);
          }
          if (a == d) {
            r.shouldDetect = false;
            S.reset();
          }
          if (n == d) {
            S.updatePointer(n, i);
          }
        };

        return this.on(t, i111[n], a), a;
      },

      doDetect: function (e, t, n, i, o) {
        var touchList = this.getTouchList(e, t);
        var touchCount = touchList.length;
        var eventType = t;
        var triggerEvent = touchList.trigger;
        var changedLength = touchCount;

        if (t === p) {
          triggerEvent = f;
        } else if (t === d) {
          triggerEvent = m;
          changedLength =
            touchList.length - (e.changedTouches ? e.changedTouches.length : 1);
        }

        if (changedLength > 0 && this.started) {
          eventType = h;
        }

        this.started = true;
        var eventData = this.collectEventData(n, eventType, touchList, e);

        if (t !== d) {
          i.call(w, eventData);
        }

        if (triggerEvent) {
          eventData.changedLength = changedLength;
          eventData.eventType = triggerEvent;
          i.call(w, eventData);
          eventData.eventType = eventType;
          delete eventData.changedLength;
        }

        if (eventType === d) {
          i.call(w, eventData);
          this.started = false;
        }

        return eventType;
      },
      determineEventTypes: function () {
        var e;
        return (
          (e = [
            "pointerdown",
            "pointermove",
            "pointerup pointercancel lostpointercapture",
          ]),
          (i111[p111] = e[0]),
          (i111[h111] = e[1]),
          (i111[d111] = e[2]),
          i111
        );
      },
      getTouchList: function (e, t) {
        return S.getTouchList();
      },
      collectEventData: function (e, t, n, i) {
        var o = l;
        return (
          v.inStr(i.type, "mouse") || S.matchType(c, i)
            ? (o = c)
            : S.matchType(u, i) && (o = u),
          {
            center: v.getCenter(n),
            timeStamp: Date.now(),
            target: i.target,
            touches: n,
            eventType: t,
            pointerType: o,
            srcEvent: i,
            preventDefault: function () {
              var e = this.srcEvent;
              e.preventManipulation && e.preventManipulation(),
                e.preventDefault && e.preventDefault();
            },
            stopPropagation: function () {
              this.srcEvent.stopPropagation();
            },
            stopDetect: function () {
              return w.stopDetect();
            },
          }
        );
      },
    }),
    S = (n.PointerEvent = {
      classType: "PointerEvent",
      pointers: {},
      getTouchList: function () {
        var e = [];
        return (
          v.each(this.pointers, function (t) {
            e.push(t);
          }),
          e
        );
      },
      updatePointer: function (e, t) {
        // console.log('lib->updatePointer',e,t);

        e == d
          ? delete this.pointers[t.pointerId]
          : ((t.identifier = t.pointerId), (this.pointers[t.pointerId] = t));
      },
      matchType: function (e, t) {
        if (!t.pointerType) return !1;
        var n = t.pointerType,
          i = {};
        return (i[c] = n === c), (i[l] = n === l), (i[u] = n === u), i[e];
      },
      reset: function () {
        this.pointers = {};
      },
    }),
    w = (n.detection = {
      classType: "Detection",
      gestures: [],
      current: null,
      previous: null,
      stopped: !1,
      startDetect: function (e, t) {
        this.current ||
          ((this.stopped = !1),
            (this.current = {
              inst: e,
              startEvent: v.extend({}, t),
              lastEvent: !1,
              lastCalcEvent: !1,
              futureCalcEvent: !1,
              lastCalcData: {},
              name: "",
            }),
            this.detect(t));
      },
      detect: function (e) {
        if (this.current && !this.stopped) {
          e = this.extendEventData(e);
          var t = this.current.inst,
            n = t.options;
          return (
            v.each(
              this.gestures,
              function (i) {
                !this.stopped &&
                  t.enabled &&
                  n[i.name] &&
                  i.handler.call(i, e, t);
              },
              this
            ),
            this.current && (this.current.lastEvent = e),
            e.eventType == d && this.stopDetect(),
            e
          );
        }
      },
      stopDetect: function () {
        (this.previous = v.extend({}, this.current)),
          (this.current = null),
          (this.stopped = !0);
      },
      getCalculatedData: function (e, t, i, o, r) {
        var a = this.current,
          s = !1,
          c = a.lastCalcEvent,
          l = a.lastCalcData;
        c &&
          e.timeStamp - c.timeStamp > n.CALCULATE_INTERVAL &&
          ((t = c.center),
            (i = e.timeStamp - c.timeStamp),
            (o = e.center.clientX - c.center.clientX),
            (r = e.center.clientY - c.center.clientY),
            (s = !0)),
          (e.eventType != f && e.eventType != m) || (a.futureCalcEvent = e),
          (a.lastCalcEvent && !s) ||
          ((l.velocity = v.getVelocity(i, o, r)),
            (l.angle = v.getAngle(t, e.center)),
            (l.direction = v.getDirection(t, e.center)),
            (a.lastCalcEvent = a.futureCalcEvent || e),
            (a.futureCalcEvent = e)),
          (e.velocityX = l.velocity.x),
          (e.velocityY = l.velocity.y),
          (e.interimAngle = l.angle),
          (e.interimDirection = l.direction);
      },
      extendEventData: function (e) {
        var t = this.current,
          n = t.startEvent,
          i = t.lastEvent || n;
        (e.eventType != f && e.eventType != m) ||
          ((n.touches = []),
            v.each(e.touches, function (e) {
              n.touches.push({
                clientX: e.clientX,
                clientY: e.clientY,
              });
            }));
        var o = e.timeStamp - n.timeStamp,
          r = e.center.clientX - n.center.clientX,
          a = e.center.clientY - n.center.clientY;
        return (
          this.getCalculatedData(e, i.center, o, r, a),
          v.extend(e, {
            startEvent: n,
            deltaTime: o,
            deltaX: r,
            deltaY: a,
            distance: v.getDistance(n.center, e.center),
            angle: v.getAngle(n.center, e.center),
            direction: v.getDirection(n.center, e.center),
            scale: v.getScale(n.touches, e.touches),
            rotation: v.getRotation(n.touches, e.touches),
          }),
          e
        );
      },
      register: function (e) {
        var i = e.defaults || {};
        return (
          i[e.name] === t && (i[e.name] = !0),
          v.extend(n.defaults, i, !0),
          (e.index = e.index || 1e3),
          this.gestures.push(e),
          this.gestures.sort(function (e, t) {
            return e.index < t.index ? -1 : e.index > t.index ? 1 : 0;
          }),
          this.gestures
        );
      },
    });
  (n.Instance = function (e, t) {
    var i = this;
    n.READY ||
      (b.determineEventTypes(),
        v.each(n.gestures, function (e) {
          w.register(e);
        }),
        b.onTouch(n.DOCUMENT, h111, w.detect),
        b.onTouch(n.DOCUMENT, d111, w.detect),
        (n.READY = !0)),
      (this.element = e),
      (this.enabled = !0),
      v.each(t, function (e, n) {
        delete t[n], (t[v.toCamelCase(n)] = e);
      }),
      (this.options = v.extend(v.extend({}, n.defaults), t || {})),
      this.options.behavior &&
      v.toggleBehavior(this.element, this.options.behavior, !0),
      (this.eventStartHandler = b.onTouch(e, p, function (e) {
        i.enabled && e.eventType == p
          ? w.startDetect(i, e)
          : e.eventType == f && w.detect(e);
      })),
      (this.eventHandlers = []);
  }),
    (n.Instance.prototype = {
      classType: "Hammer.Instance",
      on: function (e, t) {
        var n,
          i = this,
          o = i.eventHandlers.length,
          r = null;
        for (n = 0; n < o; ++n)
          i.eventHandlers[n].gesture === e && (r = i.eventHandlers[n].handler);
        return (
          r && this.off(e, r),
          b.on(i.element, e, t, function (e) {
            i.eventHandlers.push({
              gesture: e,
              handler: t,
            });
          }),
          i
        );
      },
      off: function (e, t) {
        var n = this,
          i = e.split(" ");
        return (
          v.each(i, function (e) {
            var t,
              i = n.eventHandlers.length,
              o = null;
            for (t = 0; t < i; ++t)
              if (n.eventHandlers[t].gesture === e) {
                o = n.eventHandlers[t].handler;
                break;
              }
            o &&
              b.off(n.element, e, o, function (e) {
                var t = v.inGestureArray(n.eventHandlers, {
                  gesture: e,
                });
                !1 !== t && n.eventHandlers.splice(t, 1);
              });
          }),
          n
        );
      },
      trigger: function (e, t) {
        t || (t = {});
        var i = n.DOCUMENT.createEvent("Event");
        i.initEvent(e, !0, !0), (i.gesture = t);
        var o = this.element;
        return (
          v.hasParent(t.target, o) && (o = t.target), o.dispatchEvent(i), this
        );
      },
      enable: function (e) {
        return (this.enabled = e), this;
      },
      dispose: function () {
        var e, t;
        for (
          v.toggleBehavior(this.element, this.options.behavior, !1), e = -1;
          (t = this.eventHandlers[++e]);

        )
          v.off(this.element, t.gesture, t.handler);
        return (
          (this.eventHandlers = []),
          b.off(this.element, i[p], this.eventStartHandler),
          null
        );
      },
    }),
    (g = "drag"),
    (y = !1),
    (n.gestures.Drag = {
      name: g,
      index: 50,
      handler: function (e, t) {
        var n = w.current;
        if (
          t.options.dragMaxTouches > 0 &&
          e.touches.length > t.options.dragMaxTouches
        )
          y = !1;
        else
          switch (e.eventType) {
            case p:
              y || (t.trigger(g + "start", e), (y = !0)),
                t.trigger(g, e),
                e.srcEvent.stopPropagation(),
                e.srcEvent.preventDefault();
              break;
            case h:
              if (
                (e.srcEvent.stopPropagation(),
                  e.srcEvent.preventDefault(),
                  e.distance < t.options.dragMinDistance && n.name != g)
              )
                return void e.srcEvent.preventDefault();
              var i = n.startEvent.center;
              if (
                n.name != g &&
                ((n.name = g),
                  t.options.dragDistanceCorrection && e.distance > 0)
              ) {
                var o = Math.abs(t.options.dragMinDistance / e.distance);
                (i.pageX += e.deltaX * o),
                  (i.pageY += e.deltaY * o),
                  (i.clientX += e.deltaX * o),
                  (i.clientY += e.deltaY * o),
                  (e = w.extendEventData(e));
              }
              t.trigger(g, e);
              break;
            case m:
              y &&
                e.changedLength <= t.options.dragMaxTouches &&
                (t.trigger(g + "end", e), (y = !1));
          }
      },
      defaults: {
        dragMinDistance: 1,
        dragDistanceCorrection: !0,
        dragMaxTouches: 1,
      },
    }),
    (function (e) {
      var t;
      n.gestures.Hold = {
        name: e,
        index: 10,
        defaults: {
          holdTimeout: 500,
          holdThreshold: 2,
        },
        handler: function (n, i) {
          var o = i.options,
            r = w.current;
          switch (n.eventType) {
            case p:
              clearTimeout(t),
                (r.name = e),
                (t = setTimeout(function () {
                  !r || (r.name != e && "drag" != r.name) || i.trigger(e, n);
                }, o.holdTimeout));
              break;
            case h:
              n.distance > o.holdThreshold && clearTimeout(t);
              break;
            case m:
              clearTimeout(t);
          }
        },
      };
    })("hold"),
    (function (e) {
      var t = !1;
      n.gestures.Tap = {
        name: e,
        index: 100,
        handler: function (n, i) {
          var o,
            r,
            a = i.options,
            s = w.current,
            c = w.previous;
          switch (n.eventType) {
            case p:
              t = !1;
              break;
            case h:
              t = t || n.distance > a.tapMaxDistance;
              break;
            case d:
              !v.inStr(n.srcEvent.type, "cancel") &&
                n.deltaTime < a.tapMaxTime &&
                !t &&
                ((o = c && c.lastEvent && n.timeStamp - c.lastEvent.timeStamp),
                  (r = !1),
                  c &&
                  c.name == e &&
                  o &&
                  o < a.doubleTapInterval &&
                  n.distance < a.doubleTapDistance &&
                  (i.trigger("doubletap", n), (r = !0)),
                  (r && !a.tapAlways) || ((s.name = e), i.trigger(s.name, n)));
          }
        },
        defaults: {
          tapMaxTime: 250,
          tapMaxDistance: 10,
          tapAlways: !1,
          doubleTapDistance: 20,
          doubleTapInterval: 300,
        },
      };
    })("tap"),
    (function (e) {
      var t = !1;
      n.gestures.Transform = {
        name: e,
        index: 45,
        defaults: {
          transformMinScale: 0.01,
          transformMinRotation: 1,
        },
        handler: function (n, i) {
          switch (n.eventType) {
            case p:
              t = !1;
              break;
            case h:
              if (n.touches.length < 2) return;
              var o = Math.abs(1 - n.scale),
                r = Math.abs(n.rotation);
              if (
                o < i.options.transformMinScale &&
                r < i.options.transformMinRotation
              )
                return;
              (w.current.name = e),
                t || (i.trigger(e + "start", n), (t = !0)),
                i.trigger(e, n),
                r > i.options.transformMinRotation && i.trigger("rotate", n),
                o > i.options.transformMinScale &&
                (i.trigger("pinch", n),
                  i.trigger("pinch" + (n.scale < 1 ? "in" : "out"), n));
              break;
            case m:
              t && n.changedLength < 2 && (i.trigger(e + "end", n), (t = !1));
          }
        },
      };
    })("transform"),
    (e.Hammer = n);
})(window);
