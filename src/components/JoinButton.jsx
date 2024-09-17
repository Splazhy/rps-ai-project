import { ImBlocked } from 'solid-icons/im'
import { FaSolidArrowRightToBracket } from 'solid-icons/fa'
import { Match, Show, Switch } from "solid-js"

export default function JoinButton(props) {
  return (
    <button class={'font-mono text-base btn btn-sm btn-success' + (props.disabled ? ' btn-disabled' : '')}>
      <Switch>
        <Match when={props.disabled}>
          <ImBlocked />
          Full
        </Match>
        <Match when={!props.disabled}>
          <FaSolidArrowRightToBracket />
          Join
        </Match>
      </Switch>
    </button>
  );
}