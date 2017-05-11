'use babel';

import ImportHelper from '../lib/import-helper';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ImportHelper', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('import-helper');
  });

  describe('when the import-helper:insert event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.import-helper')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'import-helper:insert');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.import-helper')).toExist();

        let importHelperElement = workspaceElement.querySelector('.import-helper');
        expect(importHelperElement).toExist();

        let importHelperPanel = atom.workspace.panelForItem(importHelperElement);
        expect(importHelperPanel.isVisible()).toBe(false);
        atom.commands.dispatch(workspaceElement, 'import-helper:insert');
        expect(importHelperPanel.isVisible()).toBe(false);
      });
    });

  });
});
