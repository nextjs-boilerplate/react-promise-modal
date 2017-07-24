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

class SomeComponent extends React.Component {
  render() {
    return (<div>
      <button onClick={this.showModal.bind(this)}>do something </button>
      <Modal ref="modal" />
    </div>)
  }

  showModal() {
    const { modal } = this.refs

    modal.show()
      .then((result) => {
        alert('resolve:'+JSON.stringify(result))
      })
      .catch((err) => {
        alert('reject:'+JSON.stringify(err))
      })
  }
}

export default SomeComponent
```


### customize

Customized.js

```


import { Modal, Button } from 'react-bootstrap'
import PromiseModal from 'react-promise-modal'

const options = ['','A','B','C']

export default class Customized extends PromiseModal {

  constructor(props) {
    super(props)

    const { selected = '' } = props
    this.state = {
      ...this.state, // {show:false}
      selected,
    }
  }


  /**
   * 用于变更配置
   * @return {Object}
   */
  getConfig() {
    const { selected } = this.state
    const resolve = this.getResolve()
    const reject = this.getReject()

    return {
      headerContent: (<Modal.Title>Customized Modal</Modal.Title>),
      bodyContent: (<p>select and confirm：
        <select value={selected} onChange={this.handleSelect.bind(this)}>
          {options.map((v)=>(<option key={v} value={v}>{v||'--'}</option>))}
        </select>
      </p>),
      footerContent: (<div>
        <Button onClick={() => reject('cancleBtn')}>Cancle</Button>
        {!!selected && <Button bsStyle="primary" onClick={() => resolve(selected)}>Confirm</Button>}
      </div>),
      modalProps: { className: 'test' },
      headerProps: { closeButton: false },
      bodyProps: { style: { color: '#FF0000' } },
      footerProps: {},
    }
  }

  handleSelect(e){
    this.setState({
      selected: e.target.value,
    })
  }
}
```

and use it

```
import React from 'react'
import Modal from './Customized'

class SomeComponent extends React.Component {
  render() {
    return (<div>
      <button onClick={this.showModal.bind(this)}>do something </button>
      <Modal ref="modal" />
    </div>)
  }

  showModal() {
    const { modal } = this.refs

    modal.show()
      .then((result) => {
        alert('resolve:'+JSON.stringify(result))
      })
      .catch((err) => {
        alert('reject:'+JSON.stringify(err))
      })
  }
}

export default SomeComponent
```