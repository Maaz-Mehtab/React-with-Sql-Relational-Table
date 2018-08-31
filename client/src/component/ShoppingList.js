import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import  AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import { GetItems,AddItem,DeleteItem ,EditItem} from '../store/Actions/action';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name:'',
            modal: false,
            modalname: '',
            itemstate: '',

        }
        this.props.isGetItems();
        this.toggle = this.toggle.bind(this);
        this.modelname = this.modelname.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount() {
        this.props.isGetItems();
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    submit(item) {
        const name = prompt("enter Item");
        if (name) {
            let obj = {
                Name: name,
            }
            this.props.isAddItem(obj)
        }
    }

    delete(id) {
        console.log("id",id)
     
        this.props.isDeleteItem(id)
    }
    edit(id, val) {
        console.log("val",val)
        console.log("id",id)
        this.setState({
            modalname: val.Name,
            itemstate: val
        }, )
        this.toggle()
    }
    modelname(ev) {
        this.setState({
            modalname: ev.target.value
        })
    }


   
    update() {
        this.state.itemstate.Name = this.state.modalname
        this.toggle();
        this.props.isEditItem(this.state.itemstate.id,this.state.itemstate)
        
    }

    render() {
        let items = [];
        items = this.props.stateGetManufacturer
        return (

            <div>
                <AppNavbar/>
            <Container>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit User Name</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Brand Name</Label>
                                <Input type="name" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.update}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button
                    color="dark"
                    onClick={this.submit.bind(this)} >Add Item</Button>
            
                {items.length > 0 &&
                    <div>
                        {items.map((val, ind) => {

                            return (
                                <div className="container" key={ind}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h1>{val.Name}</h1>
                                    </div>

                                    <div className="col-sm-6">

                                     
                                    <button className="btn btn-outline-danger float-right pl-4 pr-4 mr-2" onClick={this.delete.bind(this, val.id)}>Delete</button>
                                    <button className="btn btn-outline-warning float-right mr-2" onClick={this.edit.bind(this, val.id, val)}>Edit</button>
                                    {/* <button className="btn btn-outline-success float-right pl-4 pr-4 mr-2"  >Items</button> */}
                        <Link to={{ pathname: '/ItemList/'+val.Name, state: {key: val.id    }}}>
                                 <button className="btn btn-outline-success float-right pl-4 pr-4 mr-2"  >Items</button>
                                 </Link>
                                    </div>
                                </div>
                                </div>

                            )
                        })}
                    </div>
                }
            </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("!!",state.root.manufacturer)
    return {
        stateGetManufacturer: state.root.manufacturer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isGetItems: (obj) => {
            dispatch(GetItems(obj))
        },
        isAddItem: (obj) => {
            dispatch(AddItem(obj))
        },
        isDeleteItem: (id) => {
            dispatch(DeleteItem(id))
        },
        isEditItem: (id,obj) => {
            dispatch(EditItem(id,obj))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);