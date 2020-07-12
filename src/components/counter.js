import React, {Component} from 'react';


  class Counter extends Component{
    state:{ "name: kuki"};
    render(){
    return(
      <div className="counter">
          <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      

      </div>
      );
    }

  } 
 