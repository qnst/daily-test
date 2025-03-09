

import './B.Text'
import $ from "jquery"

class Spell {

  public doc: any;
  public isActive: boolean;
  public isInitialized: boolean;
  public inProcessSpellList: any;
  public inProcessCallback: any;
  public spellMenuRequest: any;
  public spellMenuData: any;
  public wordCache: any;
  public userDict: any;
  public ignoreList: any;
  public userSpell: any;
  public curDict: any;
  public inAsyncSpellCheck: boolean;
  public bIgnoreAllCaps: boolean;
  public bIgnoreInitCaps: boolean;
  public bIgnoreMixedCaps: boolean;
  public bIgnoreMixedAlphaNum: boolean;
  public bAutoCorrect: boolean;

  /**
   * Initializes a new instance of the Spell class for text spell checking
   *
   * The Spell class provides spell checking functionality for text elements in a document,
   * including detection of misspelled words, suggestions, custom dictionaries, and various
   * options to control spell checking behavior.
   *
   * @param document - The document containing text elements to be spell checked
   */
  constructor(document) {
    console.log("B.Text.Spell: Constructor initialized with document", document);

    this.doc = document;
    this.isActive = false;
    this.isInitialized = false;
    this.inProcessSpellList = null;
    this.inProcessCallback = null;
    this.spellMenuRequest = null;
    this.spellMenuData = null;
    this.wordCache = {};
    this.userDict = [];
    this.ignoreList = [];
    this.userSpell = null;
    this.curDict = Spell.DictMap.en;
    this.inAsyncSpellCheck = false;
    this.bIgnoreAllCaps = false;
    this.bIgnoreInitCaps = false;
    this.bIgnoreMixedCaps = false;
    this.bIgnoreMixedAlphaNum = false;
    this.bAutoCorrect = false;

    console.log("B.Text.Spell: Constructor completed");
  }

  /**
   * Initializes the spell checking system with default dictionary
   * Sets up the necessary components for spell checking and marks the system as initialized
   */
  Initialize() {
    console.log("B.Text.Spell: Initializing spell checker");
    this.curDict = Spell.FindDefaultDictionary();
    Spell.ServerInit(this.curDict);
    this.isInitialized = true;
    console.log("B.Text.Spell: Initialized with dictionary:", this.curDict);
  }

  /**
   * Loads user dictionary data for custom spell checking
   * Called after basic initialization to add user-specific words and preferences
   */
  UserInitialize() {
    console.log("B.Text.Spell: Initializing user dictionary");
    this.LoadUserDict();
    console.log("B.Text.Spell: User dictionary initialization requested");
  }

  /**
   * Sets the active state of the spell checker
   * @param isActive - Boolean indicating whether spell checking should be active
   */
  SetActive(isActive) {
    console.log("B.Text.Spell: Setting active state to", isActive);
    this.isActive = isActive;
  }

  /**
   * Gets the current active state of the spell checker
   * @returns Boolean indicating whether spell checking is currently active and initialized
   */
  GetActive() {
    const status = this.isInitialized && this.isActive;
    console.log("B.Text.Spell: Get active state:", status);
    return status;
  }

  /**
   * Checks if an asynchronous spell check operation is currently in progress
   * @returns Boolean indicating if asynchronous spell checking is active
   */
  InAsyncSpellCheck() {
    console.log("B.Text.Spell: Checking async spell check status:", this.inAsyncSpellCheck);
    return this.inAsyncSpellCheck;
  }

  /**
   * Clears the asynchronous spell check flag
   * Used to mark that any ongoing asynchronous spell check operations have completed
   */
  ClearAsyncSpellCheck() {
    console.log("B.Text.Spell: Clearing async spell check flag");
    this.inAsyncSpellCheck = false;
  }

  /**
   * Performs spell checking on a specific text object
   * @param textObj - The text object to check spelling for
   * @param forceRecheck - Boolean indicating whether to force a full recheck
   * @returns Boolean indicating if spell checking was performed
   */
  CheckSpellingForTextObj(textObj, forceRecheck) {
    console.log("B.Text.Spell: Checking spelling for text object", textObj);

    if (!this.GetActive() || !textObj.GetSpellCheck()) {
      console.log("B.Text.Spell: Spell checking skipped - inactive or disabled for object");
      return false;
    }

    const spellCheckList = textObj.GetSpellCheckList();

    if (forceRecheck) {
      for (let i = 0; i < spellCheckList.list.length; i++) {
        spellCheckList.list[i].status = Spell.WordState.NOTPROCESSED;
      }
      console.log("B.Text.Spell: Forced recheck - reset all words status");
    }

    this.ProcessSpellingMain(spellCheckList, textObj);
    console.log("B.Text.Spell: Spell checking initiated for text object");
    return true;
  }

  /**
   * Checks spelling for all text objects in the document
   * @param callback - Optional callback function to execute after spell checking completes
   */
  CheckAllSpelling(callback) {
    console.log("B.Text.Spell: Checking all spelling, callback present:", !!callback);

    if (!this.GetActive()) {
      console.log("B.Text.Spell: Spell checker not active, clearing text objects");
      this.ClearTextObjects();
      if (callback) callback();
      return;
    }

    const document = this.doc;
    this.inProcessSpellList = [];
    this.inProcessCallback = callback || null;
    this.GetTextList(this.inProcessSpellList, document);
    this.ProcessSpellList();

    console.log("B.Text.Spell: Started spell checking for", this.inProcessSpellList.length, "text objects");
  }

  /**
   * Clears spell checking information from all text objects in the document
   */
  ClearTextObjects() {
    console.log("B.Text.Spell: Clearing spell check information from all text objects");

    const document = this.doc;
    const textObjects = [];
    this.GetTextList(textObjects, document);

    for (let i = 0; i < textObjects.length; i++) {
      textObjects[i].textObj.UpdateSpellCheck(null);
    }

    console.log("B.Text.Spell: Cleared spell check information from", textObjects.length, "text objects");
  }

  /**
   * Adds a word to the user dictionary
   * @param word - The word to add to the dictionary
   */
  AddWord(word) {
    console.log("B.Text.Spell: Adding word to dictionary:", word);
    this.AddToUserDict(word);
  }

  /**
   * Adds a word to the ignore list for the current session
   * @param word - The word to ignore in spell checking
   */
  IgnoreWord(word) {
    console.log("B.Text.Spell: Ignoring word:", word);

    this.AddWordToCache(word, true);
    if (this.ignoreList.indexOf(word) < 0) {
      this.ignoreList.push(word);
    }

    console.log("B.Text.Spell: Ignore list size:", this.ignoreList.length);
  }

  /**
   * Gets the current list of words being ignored by the spell checker
   * @returns Array of words being ignored
   */
  GetIgnoreList() {
    console.log("B.Text.Spell: Getting ignore list, size:", this.ignoreList.length);
    return this.ignoreList;
  }

  /**
   * Sets the list of words to be ignored by the spell checker
   * @param ignoreList - Array of words to ignore
   */
  SetIgnoreList(ignoreList) {
    console.log("B.Text.Spell: Setting ignore list:", ignoreList);

    this.ignoreList = ignoreList ? ignoreList.slice(0) : [];
    const self = this;

    this.ignoreList.forEach(function (word) {
      self.AddWordToCache(word, true);
    });

    console.log("B.Text.Spell: Ignore list set with", this.ignoreList.length, "words");
  }

  /**
   * Sets the current dictionary to use for spell checking
   * @param dictionary - Dictionary identifier string
   */
  SetCurrentDictionary(dictionary) {
    console.log("B.Text.Spell: Setting current dictionary to:", dictionary);

    if (!(dictionary instanceof String)) {
      dictionary = String(dictionary);
    }

    if (!Spell.DictMap[dictionary]) {
      dictionary = Spell.FindDefaultDictionary();
      console.log("B.Text.Spell: Invalid dictionary specified, using default:", dictionary);
    }

    this.curDict = dictionary;
    this.ClearCache();

    console.log("B.Text.Spell: Dictionary set to:", this.curDict);
  }

  /**
   * Gets the current dictionary being used for spell checking
   * @returns String identifier for the current dictionary
   */
  GetCurrentDictionary() {
    console.log("B.Text.Spell: Getting current dictionary:", this.curDict);
    return this.curDict;
  }

  /**
   * Sets spell checking flags to control behavior
   * @param flags - Bitwise flags controlling spell checker behavior
   */
  SetSpellFlags(flags) {
    console.log("B.Text.Spell: Setting spell flags:", flags);

    this.bIgnoreAllCaps = (flags & Globals.SpellFlags.IgnoreAllCaps) != 0;
    this.bIgnoreInitCaps = (flags & Globals.SpellFlags.IgnoreInitCaps) != 0;
    this.bIgnoreMixedCaps = (flags & Globals.SpellFlags.IgnoreMixedCase) != 0;
    this.bIgnoreMixedAlphaNum = (flags & Globals.SpellFlags.IgnoreMixedAlphaNum) != 0;
    this.ClearCache();

    console.log("B.Text.Spell: Spell flags set, all caps:", this.bIgnoreAllCaps,
      "init caps:", this.bIgnoreInitCaps,
      "mixed caps:", this.bIgnoreMixedCaps,
      "alphanumeric:", this.bIgnoreMixedAlphaNum);
  }

  /**
   * Gets the current spell checking flags
   * @returns Integer with bitwise flags representing current spell checking options
   */
  GetSpellFlags() {
    let flags = 0;

    if (this.bIgnoreAllCaps) {
      flags |= Globals.SpellFlags.IgnoreAllCaps;
    }

    if (this.bIgnoreInitCaps) {
      flags |= Globals.SpellFlags.IgnoreInitCaps;
    }

    if (this.bIgnoreMixedCaps) {
      flags |= Globals.SpellFlags.IgnoreMixedCase;
    }

    if (this.bIgnoreMixedAlphaNum) {
      flags |= Globals.SpellFlags.IgnoreMixedAlphaNum;
    }

    console.log("B.Text.Spell: Getting spell flags:", flags);
    return flags;
  }

  /**
   * Shows the spell checking suggestions menu for a specific text position
   * @param textObject - The text object to show suggestions for
   * @param charIndex - The character index where the misspelling is located
   * @param clientX - The X coordinate for menu positioning
   * @param clientY - The Y coordinate for menu positioning
   */
  ShowSpellMenu(textObject, charIndex, clientX, clientY) {
    console.log("B.Text.Spell: Showing spell menu at position", clientX, clientY,
      "for text object with char index:", charIndex);

    this.spellMenuRequest = {
      textID: textObject.GetInternalID(),
      charIndex: charIndex,
      clientX: clientX,
      clientY: clientY
    };

    if (!this.ProcessSpellMenuRequest(textObject, true)) {
      this.CheckSpellingForTextObj(textObject);
    }

    console.log("B.Text.Spell: Spell menu request processed");
  }

  /**
   * Loads the user's custom dictionary from the server
   * Makes a request to retrieve custom dictionary data and updates the spell checker
   */
  LoadUserDict() {
    console.log("B.Text.Spell: Loading user dictionary from server");

    Spell.ServerGetCustomDict((success, dictionaryData) => {
      if (success) {
        console.log("B.Text.Spell: Successfully retrieved user dictionary");
        T3Gv.docUtil.svgDoc.GetSpellCheck().SetUserDictFromSource(dictionaryData);
      } else {
        console.log("B.Text.Spell: Failed to retrieve user dictionary");
      }
    });
  }

  /**
   * Sets the user dictionary from source data
   * Parses the source string and initializes the user dictionary and fuzzy matching
   * @param sourceData - String containing user dictionary data
   */
  SetUserDictFromSource(sourceData) {
    console.log("B.Text.Spell: Setting user dictionary from source data");

    this.userDict = [];

    if (sourceData && sourceData.length) {
      this.userDict = sourceData.split(String.fromCharCode(1));
      console.log("B.Text.Spell: User dictionary loaded with", this.userDict.length, "words");
    }

    this.AddUserDictToCache();
    this.userSpell = new FuzzySet(this.userDict);

    console.log("B.Text.Spell: User dictionary initialized with fuzzy matching");
  }

  /**
   * Saves the user dictionary to the server
   * Serializes the dictionary and sends it for server-side storage
   */
  SaveUserDict() {
    console.log("B.Text.Spell: Saving user dictionary to server");

    const dictionaryString = this.userDict.join(String.fromCharCode(1));
    const serializedData = JSON.stringify(dictionaryString);

    Spell.ServerStoreCustomDict(serializedData, (success) => {
      if (success) {
        console.log("B.Text.Spell: User dictionary saved successfully");
      } else {
        console.log("B.Text.Spell: Failed to save user dictionary");
      }
    });
  }

  /**
   * Adds all user dictionary words to the word cache
   * Ensures all user dictionary words are marked as correct in the cache
   */
  AddUserDictToCache() {
    console.log("B.Text.Spell: Adding", this.userDict.length, "user dictionary words to cache");

    for (let i = 0; i < this.userDict.length; i++) {
      this.AddWordToCache(this.userDict[i], true);
    }

    console.log("B.Text.Spell: User dictionary words added to cache");
  }

  /**
   * Adds a word to the user dictionary
   * Updates the cache, saves the dictionary, and refreshes the fuzzy matching set
   * @param word - The word to add to the user dictionary
   */
  AddToUserDict(word) {
    console.log("B.Text.Spell: Adding word to user dictionary:", word);

    this.AddWordToCache(word, true);

    if (this.userDict.indexOf(word) < 0) {
      this.userDict.push(word);
      this.userDict.sort((a, b) => {
        return a.localeCompare(b);
      });

      this.userSpell = new FuzzySet(this.userDict);
      this.SaveUserDict();

      console.log("B.Text.Spell: Word added to user dictionary and dictionary saved");
    } else {
      console.log("B.Text.Spell: Word already exists in user dictionary");
    }
  }

  /**
   * Removes a word from the user dictionary
   * Clears the word from cache, updates the dictionary, and saves changes
   * @param word - The word to remove from the user dictionary
   */
  RemoveFromUserDict(word) {
    console.log("B.Text.Spell: Removing word from user dictionary:", word);

    const wordIndex = this.userDict.indexOf(word);

    if (wordIndex >= 0) {
      this.wordCache[word] = undefined;
      this.userDict.splice(wordIndex, 1);
      this.userSpell = new FuzzySet(this.userDict);
      this.SaveUserDict();

      console.log("B.Text.Spell: Word removed from user dictionary");
    } else {
      console.log("B.Text.Spell: Word not found in user dictionary");
    }
  }

  /**
   * Clears the entire user dictionary
   * Removes all words from the cache and dictionary, then saves the empty dictionary
   */
  ClearUserDict() {
    console.log("B.Text.Spell: Clearing entire user dictionary");

    for (let i = 0; i < this.userDict.length; i++) {
      const word = this.userDict[i];
      this.wordCache[word] = undefined;
    }

    this.userDict = [];
    this.userSpell = new FuzzySet(this.userDict);
    this.SaveUserDict();

    console.log("B.Text.Spell: User dictionary cleared");
  }

  /**
   * Gets spelling suggestions from the user's custom dictionary
   * Uses fuzzy matching to find similar words in the user dictionary
   * @param word - The word to find suggestions for
   * @returns Array of suggested words from the user dictionary
   */
  GetUserDictSuggestions(word) {
    console.log("B.Text.Spell: Getting user dictionary suggestions for:", word);

    const suggestions = [];
    let matches = null;

    if (this.userSpell) {
      matches = this.userSpell.get(word);
    }

    if (!matches || !matches.length) {
      console.log("B.Text.Spell: No user dictionary suggestions found");
      return [];
    }

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (match.length === 2 && match[0] > 0.4) {
        suggestions.push(match[1]);
      }
    }

    console.log("B.Text.Spell: Found", suggestions.length, "user dictionary suggestions");
    return suggestions;
  }

  /**
   * Processes a request to show the spell check suggestion menu
   * Verifies the request is valid and loads suggestions for the misspelled word
   *
   * @param textObject - The text object containing the misspelled word
   * @param keepRequest - Whether to keep the menu request after processing
   * @returns Boolean indicating if the request was processed successfully
   */
  ProcessSpellMenuRequest(textObject, keepRequest) {
    console.log("B.Text.Spell: Processing spell menu request for text object", textObject?.GetInternalID());

    if (!this.spellMenuRequest || !textObject) {
      console.log("B.Text.Spell: No spell menu request or text object, returning false");
      return false;
    }

    const targetTextObject = this.FindTextObj(this.spellMenuRequest.textID);
    const charIndex = this.spellMenuRequest.charIndex;
    const clientX = this.spellMenuRequest.clientX;
    const clientY = this.spellMenuRequest.clientY;

    if (!keepRequest) {
      this.spellMenuRequest = null;
    }

    if (!targetTextObject || targetTextObject.GetInternalID() != textObject.GetInternalID()) {
      console.log("B.Text.Spell: Text object not found or doesn't match request, returning false");
      return false;
    }

    const spellCheckList = textObject.GetSpellCheckList();
    const textID = targetTextObject.GetInternalID();
    const wordIndex = this.FindWordInWordList(spellCheckList, charIndex);

    if (wordIndex < 0 || spellCheckList.list[wordIndex].status == Spell.WordState.NOTPROCESSED) {
      console.log("B.Text.Spell: Word not found or not processed yet, returning false");
      return false;
    }

    const self = this;
    this.LoadCacheSuggest(spellCheckList.list[wordIndex].word, (success, suggestions) => {
      if (success) {
        console.log("B.Text.Spell: Successfully loaded suggestions for word");
        spellCheckList.list[wordIndex].suggestions = suggestions;
        self.ProcessSpellMenu(textID, spellCheckList, wordIndex, clientX, clientY);
        self.spellMenuRequest = null;
      }
    });

    console.log("B.Text.Spell: Spell menu request processed successfully");
    return true;
  }

  /**
   * Processes and displays the spell check menu with suggestions
   * Prepares the spelling suggestion data and displays the contextual menu
   *
   * @param textID - The ID of the text object
   * @param spellCheckList - The list of words to check spelling for
   * @param wordIndex - The index of the misspelled word in the list
   * @param clientX - The X coordinate for menu positioning
   * @param clientY - The Y coordinate for menu positioning
   */
  ProcessSpellMenu(textID, spellCheckList, wordIndex, clientX, clientY) {
    console.log("B.Text.Spell: Processing spell menu for text", textID, "at word index", wordIndex);

    if (wordIndex < 0 || wordIndex >= spellCheckList.list.length ||
      spellCheckList.list[wordIndex].status != Spell.WordState.WRONG) {
      console.log("B.Text.Spell: Invalid word index or word is not misspelled");
      return;
    }

    this.spellMenuData = {
      wordInfo: $.extend(true, {}, spellCheckList.list[wordIndex]),
      textID: textID
    };

    if (!this.spellMenuData.wordInfo.suggestions) {
      this.spellMenuData.wordInfo.suggestions = [];
    }

    // Add user dictionary suggestions
    const userSuggestions = this.GetUserDictSuggestions(this.spellMenuData.wordInfo.word);
    if (userSuggestions && userSuggestions.length) {
      this.spellMenuData.wordInfo.suggestions = userSuggestions.concat(this.spellMenuData.wordInfo.suggestions);
    }

    // Handle capitalization for suggestions
    if (this.IsInitUpper(this.spellMenuData.wordInfo.word)) {
      const suggestionCount = this.spellMenuData.wordInfo.suggestions.length;
      for (let i = 0; i < suggestionCount; i++) {
        if (this.IsAllLower(this.spellMenuData.wordInfo.suggestions[i])) {
          this.spellMenuData.wordInfo.suggestions[i] = this.MakeInitUpper(this.spellMenuData.wordInfo.suggestions[i]);
        }
      }
    }

    console.log("B.Text.Spell: Showing contextual menu with", this.spellMenuData.wordInfo.suggestions.length, "suggestions");
    // Commands.MainController.ShowContextualMenu(Resources.Controls.Dropdowns.SpellingSuggest.Id, clientX, clientY);
  }

  /**
   * Adds the currently selected misspelled word to the user dictionary
   * When a user selects "Add to Dictionary" from the spell check menu,
   * this function adds the word to the user dictionary
   */
  HandleMenu_Add() {
    console.log("B.Text.Spell: Handling menu 'Add to Dictionary' action");

    if (this.spellMenuData) {
      const word = this.spellMenuData.wordInfo.word;
      console.log("B.Text.Spell: Adding word to dictionary:", word);

      const textObject = this.FindTextObj(this.spellMenuData.textID);
      if (textObject) {
        this.AddWord(word);
      }

      this.spellMenuData = null;
      console.log("B.Text.Spell: Word added to dictionary and menu data cleared");
    }
  }

  /**
   * Ignores the currently selected misspelled word for the current session
   * When a user selects "Ignore" from the spell check menu,
   * this function adds the word to the ignore list
   */
  HandleMenu_Ignore() {
    console.log("B.Text.Spell: Handling menu 'Ignore' action");

    if (this.spellMenuData) {
      const word = this.spellMenuData.wordInfo.word;
      console.log("B.Text.Spell: Ignoring word:", word);

      const textObject = this.FindTextObj(this.spellMenuData.textID);
      if (textObject) {
        this.IgnoreWord(word);
      }

      this.spellMenuData = null;
      console.log("B.Text.Spell: Word added to ignore list and menu data cleared");
    }
  }

  /**
   * Replaces the misspelled word with a selected suggestion
   * When a user selects a suggestion from the spell check menu,
   * this function replaces the misspelled word with the suggestion
   *
   * @param suggestionIndex - The index of the selected suggestion in the suggestions array
   */
  HandleMenu_Suggest(suggestionIndex) {
    console.log("B.Text.Spell: Handling menu suggestion selection at index", suggestionIndex);

    if (
      !this.spellMenuData ||
      !this.spellMenuData.wordInfo.suggestions ||
      suggestionIndex < 0 ||
      suggestionIndex >= this.spellMenuData.wordInfo.suggestions.length
    ) {
      console.log("B.Text.Spell: Invalid suggestion selection, no action taken");
      return;
    }

    const suggestion = this.spellMenuData.wordInfo.suggestions[suggestionIndex];
    const startPosition = this.spellMenuData.wordInfo.start;
    const endPosition = this.spellMenuData.wordInfo.end;
    const textObject = this.FindTextObj(this.spellMenuData.textID);

    console.log("B.Text.Spell: Replacing word with suggestion:", suggestion);

    // Preserve capitalization if needed
    let finalSuggestion = suggestion;
    if (this.IsAllLower(suggestion) && this.IsInitUpper(this.spellMenuData.wordInfo.word)) {
      finalSuggestion = this.MakeInitUpper(suggestion);
      console.log("B.Text.Spell: Adjusted capitalization of suggestion to:", finalSuggestion);
    }

    if (textObject) {
      textObject.SetSelectedRange(startPosition, endPosition);
      textObject.Paste(finalSuggestion, false);
      console.log("B.Text.Spell: Word replaced successfully");
    }

    this.spellMenuData = null;
    console.log("B.Text.Spell: Menu data cleared after replacement");
  }

  /**
   * Gets the list of spelling suggestions for the current menu
   * Returns the suggestions for the misspelled word that the menu is displayed for
   *
   * @returns Array of spelling suggestions or null if no menu data is available
   */
  GetMenuSuggestions() {
    console.log("B.Text.Spell: Getting menu suggestions");

    if (this.spellMenuData && this.spellMenuData.wordInfo.suggestions) {
      console.log("B.Text.Spell: Returning", this.spellMenuData.wordInfo.suggestions.length, "suggestions");
      return this.spellMenuData.wordInfo.suggestions;
    }

    console.log("B.Text.Spell: No suggestions available, returning null");
    return null;
  }

  /**
   * Collects all spell-checkable text objects from the document
   * Recursively searches through all elements in the document and collects
   * text objects that have spell checking enabled
   *
   * @param textList - Array to populate with text objects
   * @param container - The document or container element to search within
   */
  GetTextList(textList, container) {
    console.log("B.Text.Spell: Getting text list from container with", container.ElementCount(), "elements");

    const elementCount = container.ElementCount();

    for (let elementIndex = 0; elementIndex < elementCount; elementIndex++) {
      const element = container.GetElementByIndex(elementIndex);

      if (element instanceof Text && element.GetSpellCheck()) {
        console.log("B.Text.Spell: Adding text element with ID", element.GetInternalID(), "to list");
        textList.push({
          id: element.GetInternalID(),
          textObj: element
        });
      } else if (element instanceof Group || element instanceof Layer) {
        console.log("B.Text.Spell: Searching within nested container", element.constructor.name);
        this.GetTextList(textList, element);
      }
    }
  }

  /**
   * Processes the spell check list of text objects
   * Checks each text object in the queue and processes their spelling
   * Calls the callback when complete
   */
  ProcessSpellList() {
    console.log("B.Text.Spell: Processing spell list, remaining items:", this.inProcessSpellList?.length || 0);

    // If list is empty, clean up and call callback
    if (this.inProcessSpellList && !this.inProcessSpellList.length) {
      this.inProcessSpellList = null;

      if (this.inProcessCallback) {
        console.log("B.Text.Spell: Spell list complete, calling callback");
        this.inProcessCallback();
        this.inProcessCallback = null;
      }
    }

    // If we still have a spell list to process
    if (this.inProcessSpellList) {
      this.inAsyncSpellCheck = true;

      const textObjectInfo = this.inProcessSpellList.pop();
      const textObject = this.FindTextObj(textObjectInfo.id);

      console.log("B.Text.Spell: Processing text object with ID:", textObjectInfo.id);

      if (!(textObject && this.CheckSpellingForTextObj(textObject, true))) {
        // If this object couldn't be checked, move to the next one
        this.ProcessSpellList();
      }
    } else {
      this.inAsyncSpellCheck = false;
      console.log("B.Text.Spell: Async spell check complete");
    }
  }

  /**
   * Schedules spell list processing asynchronously
   * Uses setTimeout to avoid blocking the UI thread
   */
  AsyncProcessSpellList() {
    console.log("B.Text.Spell: Scheduling async spell list processing");

    const self = this;
    setTimeout(function () {
      self.ProcessSpellList();
    }, 1);
  }

  /**
   * Retrieves a word's spell check data from the cache
   * @param word - The word to look up in the cache
   * @returns Object containing the word's spell check data or null if not found
   */
  GetWordFromCache(word) {
    console.log("B.Text.Spell: Getting word from cache:", word);

    const cacheEntry = this.wordCache[word];

    if (cacheEntry && typeof cacheEntry !== "function") {
      console.log("B.Text.Spell: Word found in cache");
      return cacheEntry;
    }

    console.log("B.Text.Spell: Word not found in cache");
    return null;
  }

  /**
   * Loads spelling suggestions for a word
   * Returns suggestions from cache or fetches them from the server
   *
   * @param word - The word to get suggestions for
   * @param callback - Callback function that receives suggestions
   */
  LoadCacheSuggest(word, callback) {
    console.log("B.Text.Spell: Loading suggestions for word:", word);

    const cacheEntry = this.GetWordFromCache(word);

    if (cacheEntry) {
      if (cacheEntry.needSuggest) {
        console.log("B.Text.Spell: Fetching suggestions from server");

        Spell.ProcessGetSuggest(word, this.curDict, function (success, suggestions) {
          if (success) {
            cacheEntry.suggest = suggestions;
            cacheEntry.needSuggest = false;

            console.log("B.Text.Spell: Loaded suggestions from server:", suggestions);

            if (callback) {
              callback(true, cacheEntry.suggest);
            }
          } else if (callback) {
            console.log("B.Text.Spell: Failed to load suggestions from server");
            callback(false);
          }
        });
      } else {
        console.log("B.Text.Spell: Using cached suggestions:", cacheEntry.suggest);

        if (callback) {
          callback(true, cacheEntry.suggest);
        }
      }
    } else if (callback) {
      console.log("B.Text.Spell: No cache entry found for word");
      callback(false);
    }
  }

  /**
   * Adds a word to the spell checker's cache with its status information
   * Stores whether a word is correct and any available spelling suggestions
   *
   * @param word - The word to add to the cache
   * @param isCorrect - Boolean indicating if the word is spelled correctly
   * @param suggestions - Array of spelling suggestions (optional)
   * @param autoCorrect - Boolean indicating if the word can be auto-corrected
   */
  AddWordToCache(word, isCorrect, suggestions, autoCorrect) {
    console.log("B.Text.Spell: Adding word to cache:", word, "isCorrect:", isCorrect);

    const suggestionsList = suggestions || [];
    const needsSuggestions = !suggestions && !isCorrect;

    this.wordCache[word] = {
      check: isCorrect,
      suggest: suggestionsList,
      auto: autoCorrect,
      needSuggest: needsSuggestions
    };

    console.log("B.Text.Spell: Word added to cache, needs suggestions:", needsSuggestions);
  }

  /**
   * Clears the word cache and rebuilds it with user dictionary words
   * Resets the cache to remove any accumulated spell check data
   */
  ClearCache() {
    console.log("B.Text.Spell: Clearing word cache");

    this.wordCache = {};
    this.AddUserDictToCache();

    console.log("B.Text.Spell: Cache cleared and rebuilt with user dictionary");
  }

  /**
   * Main entry point for processing spelling in a text object
   * Determines whether to process spelling locally or remotely
   *
   * @param spellCheckList - The list of words to check spelling for
   * @param textObject - The text object being spell checked
   */
  ProcessSpellingMain(spellCheckList, textObject) {
    console.log("B.Text.Spell: Processing spelling main for text object");

    if (this.ProcessSpellingLocal(spellCheckList, textObject, false)) {
      this.AsyncProcessSpellList();
      this.ProcessSpellMenuRequest(textObject, false);
      console.log("B.Text.Spell: Spelling processed locally");
    } else {
      this.ProcessSpellingRemote(spellCheckList, 0);
      console.log("B.Text.Spell: Spelling processing deferred to remote");
    }
  }

  /**
   * Processes spelling using the local word cache
   * Checks each word against the cache and applies spelling rules
   *
   * @param spellCheckList - The list of words to check spelling for
   * @param textObject - The text object being spell checked
   * @param skipUpdateIfIncomplete - Whether to skip updating the text object if not all words were processed
   * @returns Boolean indicating if all words were successfully processed locally
   */
  ProcessSpellingLocal(spellCheckList, textObject, skipUpdateIfIncomplete) {
    console.log("B.Text.Spell: Processing spelling locally for", spellCheckList?.list?.length, "words");

    let allWordsProcessed = true;
    let anyWordsProcessed = false;
    const wordCount = spellCheckList.list.length;

    for (let wordIndex = 0; wordIndex < wordCount; wordIndex++) {
      if (spellCheckList.list[wordIndex].status === Spell.WordState.NOTPROCESSED) {
        const word = spellCheckList.list[wordIndex].word;
        const cacheEntry = this.GetWordFromCache(word);

        if (cacheEntry) {
          // Word found in cache
          spellCheckList.list[wordIndex].status = cacheEntry.check ?
            Spell.WordState.CORRECT : Spell.WordState.WRONG;
          spellCheckList.list[wordIndex].suggestions = cacheEntry.suggest;
          spellCheckList.list[wordIndex].needSuggest = cacheEntry.needSuggest;
          spellCheckList.list[wordIndex].auto = cacheEntry.auto;
          anyWordsProcessed = true;
        } else if (word.length > Spell.Globals.MaxWordSize) {
          // Word too long, mark as incorrect
          this.AddWordToCache(word, false);
          spellCheckList.list[wordIndex].status = Spell.WordState.WRONG;
          spellCheckList.list[wordIndex].needSuggest = false;
          spellCheckList.list[wordIndex].suggestions = [];
          anyWordsProcessed = true;
        } else if (
          (this.bIgnoreAllCaps && this.IsAllUpper(word)) ||
          (this.bIgnoreInitCaps && this.IsInitUpper(word)) ||
          (this.bIgnoreMixedAlphaNum && this.HasNumber(word))
        ) {
          // Word matches one of the ignore rules, mark as correct
          spellCheckList.list[wordIndex].status = Spell.WordState.CORRECT;
          spellCheckList.list[wordIndex].needSuggest = false;
          spellCheckList.list[wordIndex].suggestions = [];
          anyWordsProcessed = true;
        } else {
          // Word needs remote checking
          allWordsProcessed = false;
        }
      }
    }

    if (textObject && anyWordsProcessed && (!skipUpdateIfIncomplete || allWordsProcessed)) {
      textObject.UpdateSpellCheck(spellCheckList);
      console.log("B.Text.Spell: Text object updated with spelling results");
    }

    console.log("B.Text.Spell: Local spelling processing complete, all words processed:", allWordsProcessed);
    return allWordsProcessed;
  }

  /**
   * Processes spelling checking by sending words to a remote server
   * Collects unprocessed words from the spell check list and sends them in batches
   * to avoid exceeding server size limits
   *
   * @param spellCheckList - The list of words to check spelling for
   * @param startIndex - The index to start processing from in the list
   */
  ProcessSpellingRemote(spellCheckList, startIndex) {
    console.log("B.Text.Spell: Processing spelling remotely starting from index", startIndex);

    const wordList = [];
    let totalLength = 0;
    let nextStartIndex = 0;
    const self = this;
    const totalWords = spellCheckList.list.length;

    for (let wordIndex = startIndex; wordIndex < totalWords; wordIndex++) {
      if (
        spellCheckList.list[wordIndex].status == Spell.WordState.NOTPROCESSED &&
        wordList.indexOf(spellCheckList.list[wordIndex].word) < 0
      ) {
        totalLength += spellCheckList.list[wordIndex].word.length + 1;

        if (
          wordList.length &&
          totalLength > Spell.Globals.MaxServerListSize
        ) {
          nextStartIndex = wordIndex;
          break;
        }

        wordList.push(spellCheckList.list[wordIndex].word);
      }
    }

    if (wordList.length) {
      console.log("B.Text.Spell: Sending", wordList.length, "words to server for checking");

      this.inAsyncSpellCheck = true;
      Spell.ProcessCheckText(
        wordList,
        this.curDict,
        function (success, spellingResults) {
          if (success) {
            console.log("B.Text.Spell: Received successful response from server with", spellingResults.length, "results");
            self.RemoteSpellingCallback(spellingResults, spellCheckList, nextStartIndex);
          } else {
            console.log("B.Text.Spell: Server spell check failed");
          }
        }
      );
    } else {
      console.log("B.Text.Spell: No words to process remotely, continuing with next batch");
      this.AsyncProcessSpellList();
    }
  }

  /**
   * Handles the response from remote spell checking
   * Processes the spelling results by updating the cache and text object
   * with the spelling status of each word
   *
   * @param spellingResults - Array of spelling results from the server
   * @param spellCheckList - The list of words being checked
   * @param nextStartIndex - The index to continue processing from
   */
  RemoteSpellingCallback(spellingResults, spellCheckList, nextStartIndex) {
    console.log("B.Text.Spell: Processing remote spelling callback with", spellingResults.length, "results");

    const resultsLength = spellingResults.length;
    const textObject = this.FindTextObj(spellCheckList.textID);

    // Update the word cache with results
    for (let resultIndex = 0; resultIndex < resultsLength; resultIndex++) {
      this.AddWordToCache(
        spellingResults[resultIndex].word,
        spellingResults[resultIndex].check,
        spellingResults[resultIndex].suggest,
        spellingResults[resultIndex].auto
      );
    }

    if (nextStartIndex > 0 && nextStartIndex < spellCheckList.list.length) {
      console.log("B.Text.Spell: More words to process, continuing with next batch at index", nextStartIndex);

      // If local processing fails, continue with remote processing
      if (!this.ProcessSpellingLocal(spellCheckList, textObject, true)) {
        this.ProcessSpellingRemote(spellCheckList, nextStartIndex);
      }
    } else {
      // All words processed
      console.log("B.Text.Spell: All words processed for text object");

      if (textObject) {
        this.ProcessSpellingLocal(spellCheckList, textObject, false);
        this.ProcessSpellMenuRequest(textObject, false);
      }

      this.AsyncProcessSpellList();
    }
  }

  /**
   * Finds a text object by its internal ID
   * Recursively searches through a container to find a text object with matching ID
   *
   * @param textId - The internal ID of the text object to find
   * @param container - The container to search in (defaults to this.doc)
   * @returns The found text object or null if not found
   */
  FindTextObj(textId, container) {
    console.log("B.Text.Spell: Finding text object with ID:", textId);

    container = container || this.doc;

    const elementCount = container.ElementCount();

    for (let elementIndex = 0; elementIndex < elementCount; elementIndex++) {
      const element = container.GetElementByIndex(elementIndex);

      if (element instanceof Text) {
        if (element.GetInternalID() == textId) {
          console.log("B.Text.Spell: Text object found");
          return element;
        }
      } else if (element instanceof Group || element instanceof Layer) {
        const foundObject = this.FindTextObj(textId, element);
        if (foundObject) {
          console.log("B.Text.Spell: Text object found in nested container");
          return foundObject;
        }
      }
    }

    console.log("B.Text.Spell: Text object not found");
    return null;
  }

  /**
   * Finds a word in a word list based on character index
   * Determines which word contains the specified character position
   *
   * @param wordList - The list of words to search in
   * @param charIndex - The character index to find the word for
   * @returns The index of the word in the list, or -1 if not found
   */
  FindWordInWordList(wordList, charIndex) {
    console.log("B.Text.Spell: Finding word at character index:", charIndex);

    const listLength = wordList ? wordList.list.length : 0;

    for (let wordIndex = 0; wordIndex < listLength; wordIndex++) {
      if (charIndex >= wordList.list[wordIndex].start && charIndex < wordList.list[wordIndex].end) {
        console.log("B.Text.Spell: Found word at index:", wordIndex);
        return wordIndex;
      }
    }

    console.log("B.Text.Spell: No word found at the specified character index");
    return -1;
  }

  /**
   * Checks if a word is all uppercase
   * Determines if a string consists entirely of uppercase characters
   *
   * @param word - The word to check
   * @returns Boolean indicating if the word is all uppercase
   */
  IsAllUpper(word) {
    console.log("B.Text.Spell: Checking if word is all uppercase:", word);
    const result = word == word.toUpperCase();
    console.log("B.Text.Spell: Is all uppercase:", result);
    return result;
  }

  /**
   * Checks if a word is all lowercase
   * Determines if a string consists entirely of lowercase characters
   *
   * @param word - The word to check
   * @returns Boolean indicating if the word is all lowercase
   */
  IsAllLower(word) {
    console.log("B.Text.Spell: Checking if word is all lowercase:", word);
    const result = word == word.toLowerCase();
    console.log("B.Text.Spell: Is all lowercase:", result);
    return result;
  }

  /**
   * Checks if a word has initial uppercase formatting
   * Determines if a string starts with an uppercase letter followed by lowercase letters
   *
   * @param word - The word to check
   * @returns Boolean indicating if the word has initial uppercase formatting
   */
  IsInitUpper(word) {
    console.log("B.Text.Spell: Checking if word has initial uppercase:", word);
    const result = word == this.MakeInitUpper(word);
    console.log("B.Text.Spell: Has initial uppercase:", result);
    return result;
  }

  /**
   * Checks if a word contains numeric characters
   * Determines if a string contains at least one digit (0-9)
   *
   * @param word - The word to check
   * @returns Boolean indicating if the word contains numbers
   */
  HasNumber(word) {
    console.log("B.Text.Spell: Checking if word contains numbers:", word);
    const result = word.search(/\d/) >= 0;
    console.log("B.Text.Spell: Contains numbers:", result);
    return result;
  }

  /**
   * Makes the first letter of a string uppercase and the rest lowercase
   * @param word - The string to transform
   * @returns The transformed string with initial capital letter
   */
  MakeInitUpper(word) {
    console.log("B.Text.Spell: Making initial uppercase for:", word);
    const result = word.length ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word;
    console.log("B.Text.Spell: Initial uppercase result:", result);
    return result;
  }

  /**
   * Finds the default dictionary based on browser's language settings
   * Attempts to match the full locale (e.g., 'en-us') first, then falls back
   * to the base language code (e.g., 'en') if a full match isn't found
   * @returns The dictionary code matching the browser's language or 'en' as fallback
   */
  static FindDefaultDictionary() {
    console.log("B.Text.Spell: Finding default dictionary based on browser language");

    let languageCode;
    let defaultLanguage = 'en';
    let dictionaryMatch = null;

    if (navigator && navigator.language && navigator.language.length) {
      defaultLanguage = navigator.language.toLowerCase();
      console.log("B.Text.Spell: Detected browser language:", defaultLanguage);
    }

    languageCode = defaultLanguage.substr(0, 2);

    if (Spell.DictMap[defaultLanguage]) {
      dictionaryMatch = defaultLanguage;
      console.log("B.Text.Spell: Found exact dictionary match:", dictionaryMatch);
    }

    if (!dictionaryMatch && Spell.DictMap[languageCode]) {
      dictionaryMatch = languageCode;
      console.log("B.Text.Spell: Found language code dictionary match:", dictionaryMatch);
    }

    if (!dictionaryMatch) {
      dictionaryMatch = 'en';
      console.log("B.Text.Spell: No dictionary match found, using default:", dictionaryMatch);
    }

    return dictionaryMatch;
  }


  static WordState = {
    WRONG: 0,
    CORRECT: 1,
    NOTPROCESSED: 2
  }

  static Globals = {
    MaxWordSize: 100,
    MaxServerListSize: 1400
  }

  static DictMap = {
    en: '24941',
    'en-gb': '25202',
    'en-ca': '25441',
    'pt-br': '28770',
    da: '25697',
    nl: '25717',
    fi: '26217',
    fr: '26226',
    de: '26469',
    it: '26996',
    legal: '27745',
    medical: '28001',
    no: '25442',
    pt: '28783',
    es: '29552',
    sv: '29559'
  }

}

export default Spell
