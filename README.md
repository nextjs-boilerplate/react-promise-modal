# react-promise-modal

use modal as promise

demo: http://nextjs.i18ntech.com/components/promisemodal

demo source: https://github.com/nextjs-boilerplate/components/tree/master/components/react-promise-modal

## useage

### install

```
npm install react-promise-modal
```

### basic

some component

```
import React from 'react'
import Modal from 'react-promise-modal'

export default class SomeComponent extends React.Component {
  const {modal} = this.refs
  render(){
    return (<div>
      <button onClick={()=>{
        modal.show()
        .then((result) => {
          console.log(JSON.stringify(result))
        })
        .catch((err) => {
          console.log(JSON.stringify(err))
        })
      }}>do something </button>
      <Modal ref="modal" />
    </div>)
  }
}
```