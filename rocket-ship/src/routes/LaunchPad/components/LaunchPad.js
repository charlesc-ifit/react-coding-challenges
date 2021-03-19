import React, { useState } from 'react';
import { ClassRocket, FunctionalRocket } from './Rocket';
import '../styles/_launchpad.scss';

export default function LaunchPad() {
  /*
    Removing this useState and setTimeout prevents both ClassRocket and FunctionalRocket from
    taking off.
    => every 1/2 second, the setTimeout triggers a state change, which causes its child components
       to re-render
    => the first time the rocket renders on the page, it's constructed and contains state
       for initialLaunchTime (Date.now())
    => when the rocket is launching, state.initialLaunchTime never actually changes
      => confirmed by console logging that state field on each render in ClassRocket
      => however, each render compares state.initialLaunchTime with the Date.now() of when
         the rocket gets rendered. That comparison calcs the y-position of the rocket, which
         creates the rocket's motion.
    => Therefore, removing this state change prevents the rockets from moving.
  */
  // const [rerenderCount, triggerRerender] = useState(0);

  // setTimeout(() => { triggerRerender(rerenderCount + 1); }, 500);

  return (
    <div className="launchpad">
      <ClassRocket />
    </div>
  );
}
