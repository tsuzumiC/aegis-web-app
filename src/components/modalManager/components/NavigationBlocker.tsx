import React, { useEffect } from "react";
import history from "history/browser";

interface IProps {
    showPrompt: boolean;
}

/*
https://stackoverflow.com/a/74065505
*/

const NavigationBlocker: React.FC<React.PropsWithChildren<IProps>> = (
    props
) => {
    const when = props.showPrompt;

    useEffect(() => {
        if (!when) {
            return;
        }

        // Block navigation and register a callback that
        // fires when a navigation attempt is blocked.
        const unblock = history.block((tx) => {
            // Navigation was blocked! Let's show a confirmation dialog
            // so the user can decide if they actually want to navigate
            // away and discard changes they've made in the current page.

            if (
                window.confirm(
                    "THERE_ARE_UNSAVED_CHANGES_ARE_YOU_SURE_YOU_WANT_TO_LEAVE"
                )
            ) {
                // Unblock the navigation.
                unblock();

                // Retry the transition.
                tx.retry();
            }
        });

        return unblock;
    }, [when]);

    return null;
};

export default NavigationBlocker;
