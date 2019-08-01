import React, {Component} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axiosInstance) =>  {
        return class extends Component {
            state = {
                errorExists: false,
                errorHandled: false,
                error: null
            }
            componentWillMount(){
                this.reqInterceptor = axiosInstance.interceptors.request.use(null, err=>{
                    this.setState({error:err.message, errorExists:true})
                })
                this.resInterceptor = axiosInstance.interceptors.response.use(null, err=>{
                    this.setState({error:err.message, errorExists:true})
                })
            }
            componentWillUnmount(){
                axiosInstance.interceptors.request.eject(this.reqInterceptor)
                axiosInstance.interceptors.response.eject(this.resInterceptor)
            }
            errorWindowClose = () => {
                this.setState({errorExists: false})
            }
            render(){
                // console.log(selectData)
                return (
                    <Auxiliary>
                        <Modal 
                            show={this.state.errorExists} 
                            close={this.errorWindowClose}>{this.state.error}</Modal>
                        <WrappedComponent {...this.props} />
                    </Auxiliary>
                )
            }
        }
    }


export default withErrorHandler