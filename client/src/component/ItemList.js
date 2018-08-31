import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { connect } from 'react-redux';
import { GetItemsList ,AddItemList,DeleteItemList,EditItemList} from '../store/Actions/action';
// import { GetItems, AddItemList, GetItemsList, DeleteItem, EditItem } from '../store/Actions/action';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ManufacturedId:this.props.location.state.key,
            modal: false,
            items: [],
            modalname: '',
            modalprice: '',
            MakerId: 0,
            listflag: false,
            individual_Item_List: '',
            IsEdit:false,
            itemstate:''
        }



        this.toggle = this.toggle.bind(this);
        this.AddItem = this.AddItem.bind(this);
        this.modelname = this.modelname.bind(this);
        this.modalprice = this.modalprice.bind(this);
        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
        // this.props.isGetItemsList();

    }
    // componentDidMount() {
    //     // this.props.isGetItems();
    //     this.props.isGetItemsList(this.state.ManufacturedId);
    // }
    componentWillMount(){
        this.props.isGetItemsList(this.state.ManufacturedId);
    }

    AddItem(){
        this.setState({
            IsEdit:false
        })
        this.toggle();
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    modelname(ev) {
        this.setState({
            modalname: ev.target.value
        })
    }

    modalprice(ev) {
        this.setState({
            modalprice: ev.target.value
        })
    }
    submit() {
        // console.log("submit",this.props.stateGetItems);

    //    let itemObj= this.props.stateGetItems.filter(a=>a._id==this.state.MakerId)
    //    console.log("ii",itemObj)
        let obj = {
            Item_Name: this.state.modalname,
            Price: this.state.modalprice,
            Manufacturer_Id: this.state.ManufacturedId
        }
        console.log("obj", obj);
        this.setState({
            modalname: '',
            modalprice: '',
        },
            this.toggle())
            if(this.state.isEdit==false){

                this.props.isAddItemList(obj)
            }
            else{
                this.update();
            }
       
    }
    delete(val) {
        console.log("val",val);
     
        this.props.isDeleteItemList(val.item_id)
    }

    edit(id, val) {
        console.log("val",val);
     
        this.setState({
            modalname: val.Item_Name,
            modalprice: val.Price,
            Manufacturer_Id: val.Manufacturer_Id,
            individual_Item_List: val,
            IsEdit:true,
            itemstate: val
         },)
        this.toggle()
    }

    update() {
        console.log("this.state.itemstate",this.state.itemstate);
        this.state.itemstate.Item_Name = this.state.modalname
        this.state.itemstate.Price = this.state.modalprice
        this.toggle();
        this.props.isEditItemList(this.state.itemstate.item_id,this.state.itemstate)
        
    }
    render() {
        let list = [];
        list = this.props.stateGetItemslist
        console.log("list", list)
         return (
            <div>
                <AppNavbar />
                <Button
                    color="dark"
                    onClick={this.AddItem.bind(this)} >Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add /Edit Item List</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Item Name </Label>
                                <Input type="text" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                                <Label for="exampleEmail">Item Price</Label>
                                <Input type="text" name="modalprice" id="price" value={this.state.modalprice} onChange={this.modalprice} />

                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>
                        {(this.state.IsEdit==false)?
                       " Add"
                        :
                      "  Edit"
                        }
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className="container">
                    {list.length > 0 &&
                        <Table dark>
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Manufactured By</th>
                                    <th>Actions</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <th>{ind + 1}</th>
                                            <td>{val.Item_Name}</td>
                                            <td>{val.Price}</td>
                                            <td>{val.Name}</td>
                                            <td><button className="btn btn-outline-warning col-8" onClick={this.edit.bind(this, val._id, val)}>  Edit  </button></td>
                                            <td><button className="btn btn-outline-danger col-8" onClick={this.delete.bind(this, val)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("Isget Item List ",state.root.list)
    return {
        stateGetItemslist: state.root.list,
        // stateGetItems: state.root.items,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isAddItemList: (obj) => {
            dispatch(AddItemList(obj))
        },
        // isGetItems: () => {
        //     dispatch(GetItems())
        // },
        isGetItemsList: (id) => {
            dispatch(GetItemsList(id))
        },
        isDeleteItemList: (id) => {
            dispatch(DeleteItemList(id))
        },
        isEditItemList: (id,obj) => {
            dispatch(EditItemList(id,obj))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);