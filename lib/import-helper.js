'use babel';

import ImportHelperView from './import-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  importHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.importHelperView = new ImportHelperView(state.importHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.importHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'import-helper:insert': () => this.insert()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.importHelperView.destroy();
  },

  serialize() {
    return {
      importHelperViewState: this.importHelperView.serialize()
    };
  },

  insert() {

    var prefix = "use ";
    var suffix = ";";
    var insortLineNum = 6;

    var moduleName = "";
    var activePaneItem = atom.workspace.getActivePaneItem();
    if (activePaneItem) {
        moduleName = activePaneItem.getSelectedText();
    } else {
        console.log("Cannot get activePaneItem.");
        return;
    }

    var line = prefix + moduleName + suffix;
    //console.log(line);

    var editor = atom.workspace.getActivePane().getActiveEditor();
    var pos = editor.getCursorBufferPosition();
    //console.log(pos);

    editor.setCursorBufferPosition({ row: insortLineNum, column: 0 }, { autoscroll: false });
    editor.insertNewline({});
    editor.setCursorBufferPosition({ row: insortLineNum, column: 0 }, { autoscroll: false });
    editor.insertText(line)

    pos.row += 1;

    editor.setCursorBufferPosition(pos);
  }
};
