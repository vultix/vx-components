import { Observable, Subject } from 'rxjs';
import * as application from 'tns-core-modules/application';
import { isAndroid, View } from 'tns-core-modules/ui/core/view';
import { Constructor } from 'vx-components-base';


export interface VxNsDialogInternal {
  open(): void;
  close(): void;
}

let test: Constructor<VxNsDialogInternal, [View, Subject<void>]>;

if (isAndroid) {
  class CustomDialogImpl extends android.app.Dialog {
    constructor(
      public fragment: CustomDialogFragmentImpl,
      private backButtonSubject: Subject<void>,
      context: android.content.Context,
      themeResId: number,
    ) {
      super(context, themeResId);

      return global.__native(this);
    }

    onBackPressed(): void {
      this.backButtonSubject.next();
      // super.onBackPressed();
    }
  }

  class CustomDialogFragmentImpl extends android.support.v4.app.DialogFragment {
    dialog!: CustomDialogImpl;
    private backButtonSubject: Subject<void>;
    private view: View;

    constructor(view: View, backButtonSubject: Subject<void>) {
      try {
        super();
      } catch (e) {
        console.error(e);
      }

      this.backButtonSubject = backButtonSubject;
      this.view = view;
      return global.__native(this);
    }


    onCreateDialog(savedInstanceState: android.os.Bundle): android.app.Dialog {
      this.setStyle(android.support.v4.app.DialogFragment.STYLE_NO_TITLE, 0);

      const dialog = new CustomDialogImpl(this, this.backButtonSubject, this.getActivity(), this.getTheme());
      this.dialog = dialog;

      dialog.setCancelable(false);
      dialog.setCanceledOnTouchOutside(false);

      const window = dialog.getWindow();
      window.setDimAmount(0);


      return dialog;
    }

    onCreateView(inflater: android.view.LayoutInflater, container: android.view.ViewGroup,
                 savedInstanceState: android.os.Bundle): android.view.View {
      const view = this.view;
      (view as any)._setupAsRootView(this.getActivity());
      view._isAddedToNativeVisualTree = true;

      return view.nativeViewProtected;
    }

    // //
    onStart(): void {
      super.onStart();
      // if (this._fullscreen) {
      const window = this.getDialog().getWindow();
      const length = android.view.ViewGroup.LayoutParams.MATCH_PARENT;
      window.setLayout(length, length);

      window.setBackgroundDrawable(null as any);
      // }

      const view = this.view;
      //
      if (!view.isLoaded) {
        (view as any).callLoaded();
      }
      //
      // this._shownCallback();
    }
    //
    // onDismiss(dialog: android.content.DialogInterface): void {
    //   super.onDismiss(dialog);
    //   const manager = this.getFragmentManager();
    //   if (manager) {
    //     modalMap.delete(this.owner._domId);
    //     this._dismissCallback();
    //   }
    //
    //   const owner = this.owner;
    //   if (owner.isLoaded) {
    //     owner.callUnloaded();
    //   }
    // }
    //
    onDestroy(): void {
      super.onDestroy();
      const view = this.view;
      if (view) {
        if (view.isLoaded) {
          (view as any).callUnloaded();
        }

        view._isAddedToNativeVisualTree = false;
        view._tearDownUI(true);
      }
    }

    open(): void {
      const v = application.getRootView() as any;
      const manager: android.support.v4.app.FragmentManagerImpl = v._getRootFragmentManager();
      this.show(manager, v._domId.toString());
    }
    close(): void {
      super.dismissAllowingStateLoss();
    }
  }

  test = CustomDialogFragmentImpl;
} else {

}

export function createVxNsDialogInternal(view: View, backButtonSubject: Subject<void>): VxNsDialogInternal {
  return new test(view, backButtonSubject);
}
