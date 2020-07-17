import React from "react";
import { Observable } from "rxjs";
/**
 * Takes and Obserable and subscribes React.setState()
 * @param observable subject or observable from RXJS
 * @param setter when observable recieves data it forwards to app state
 */
const useObservable = (
  observable: Observable<any>,
  setter: React.Dispatch<React.SetStateAction<any[]>>
) => {
  React.useEffect(() => {
    let subscription = observable.subscribe((result) => setter(result));
    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export default useObservable;
