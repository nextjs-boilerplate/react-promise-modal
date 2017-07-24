import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class PromiseModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.promiseInfo = {}
  }

  /**
   * 显示
   */
  show() {
    return new Promise((resolve, reject) => {
      this.promiseInfo = {
        resolve,
        reject,
      }
      this.setState({
        show: true,
      })
    })

  }

  hide() {
    this.setState({
      show: false,
    })
  }

  render() {
    const hide = this.hide.bind(this)
    const { show } = this.state
    const { resolve, reject } = this.promiseInfo
    const {
      headerContent = (<Modal.Title>Confirmation Required</Modal.Title>),
      bodyContent = (<p>Are you sure you want to proceed?</p>),
      footerContent = (<div>
        <Button onClick={() => {
          hide()
          reject('cancleBtn')
        }}>Cancle</Button>
        <Button bsStyle="primary" onClick={() => {
            hide()
            resolve(true)
          }
        }>Confirm</Button>
      </div>),
      modalProps = {},
      headerProps = { closeButton: true },
      bodyProps = {},
      footerProps = {},
    } = this.getConfig()

    if (!show) return (<div />)

    return (<Modal {...modalProps} onHide={() => {
      hide()
      reject('blankClick or closeBtn')
    }} show={true}>
      <Modal.Header {...headerProps}>
        {headerContent}
      </Modal.Header>
      <Modal.Body {...bodyProps}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer {...footerProps}>
        {footerContent}
      </Modal.Footer>
    </Modal>)
  }

  /**
   * 用于变更配置
   * @return {Object}
   */
  getConfig(){
    return {}
  }

  /**
   * resolve
   */
  getResolve(){
    const {resolve=()=>{}} = this.promiseInfo||{}
    return (result)=>{
      resolve(result)
      this.hide()
    }
  }

  /**
   * reject
   */
  getReject(){
    const {reject=()=>{}} = this.promiseInfo||{}
    return (err)=>{
      reject(err)
      this.hide()
    }
  }
}