import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Invoice from './invoice'

// Components
import {
  Grid,
} from 'material-ui';

// Css
import cls from './InvoicesDetails.css';

import * as actions from '../../../../store/actions';

class InvoicesDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        social_reason: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          errorText: null,
        },
        identification_type: {
          value: 0,
          validation: {
            required: true,
          },
          valid: true,
          touched: true,
          errorText: null,
        },
        identification: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          errorText: null,
        },
        email: {
          elementType: 'input',
          label: 'Correo',
          elementConfig: {
            type: 'email',
            placeholder: 'ejemplo@ejemplo.com',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
          errorText: null,
        },
        telephone: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          errorText: null,
        },
        address: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          errorText: null,
        },
      },
      formIsValid: false,
      selectedOption: 1,
      check: false,
      card_id: 1,
      newInvoice: false,
      invoiceSelect: 0,
      openForm: true,
    };
    this.formInvoice = this.formInvoice.bind(this);
    this.handlerOpenForm = this.handlerOpenForm.bind(this);
    this.handlerClose = this.handlerClose.bind(this);
  }

  componentDidMount () {
    this.props.onInvoices(localStorage.getItem('token'));
  }

  handlerOpenForm = () => {
    this.setState({
      ...this.state,
        openForm: false
    })
  }

  handlerClose = () => {
    this.setState({
      ...this.state,
        openForm: true
    })
  }

  checkValidity(value, rules) {
    let isValid = true;
    let errorText = null;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
      errorText = 'Requerido.';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      errorText = `Debe contener mas de ${rules.minLength} caracteres.`;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
      errorText = `Debe contener menos de ${rules.maxLength} caracteres.`;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      errorText = 'Debe ser un email valido.';
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
      errorText = 'Debe ser solo numerico.';
    }

    return {
      isValid,
      errorText,
    };
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.formData,
      [controlName]: {
        ...this.state.formData[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.formData[controlName].validation,
        ).isValid,
        errorText: this.checkValidity(
          event.target.value,
          this.state.formData[controlName].validation,
        ).errorText,
        touched: true,
      },
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formData: updatedControls,
      formIsValid,
    });
  }

  formInvoice = (event) => {
    event.preventDefault();
    const formData = {};
    for (const formElementIdentifier in this.state.formData) {
      formData[formElementIdentifier] = this.state.formData[formElementIdentifier].value;
    }
    const invoice_detail = {
      invoice_detail: formData,
    };
    this.props.onCreatedInvoice(localStorage.getItem('token'), invoice_detail);
  }

  render () {
    let formReg = null;
    if (this.props.invoices.length > 0 && this.state.openForm) {
      formReg = (
        <Grid container>
          {Object.keys(this.props.invoices).length > 0 ? 
            this.props.invoices.map(i => (
              <Invoice
                key={i.id}
                id={i.id}
                data={i.attributes}
              />
          )) : (
            <h2><strong>No tienes detalles de facturación</strong></h2>
          )}     
        </Grid>
      )
    } else {
      formReg = (
        <form>
          <div className={cls.row}>
            <div className={cls.col25}>
              <label for="socialReason">Razón social:</label>
            </div>
            <div className={cls.col75}>
              <input
                className={(!this.state.formData.social_reason.valid && this.state.formData.social_reason.touched) && cls.ContainerError}
                type="text"
                id="social_reason"
                name="social_reason"
                value={this.state.formData.social_reason.value}
                placeholder="Tú nombre completo"
                onChange={(event) => this.inputChangedHandler(event, 'social_reason')}
              />
              {!this.state.formData.social_reason.valid && this.state.formData.social_reason.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.social_reason.errorText}
                </div>
              ) : null}
            </div>
          </div>
          <div className={cls.row}>
            <div className={cls.col25}>
              <label for="identificationType">Identificación:</label>
            </div>
            <div className={`${cls.col25} ${cls.fixNoPadding}`}>
              <select>
                <option
                  value="consumidor_final"
                  onClick={(event) => this.inputChangedHandler(event, 'identification_type')}>Consumidor final</option>
                <option
                  value="cedula"
                  onClick={(event) => this.inputChangedHandler(event, 'identification_type')}>Cédula</option>
                <option
                  value="ruc"
                  onClick={(event) => this.inputChangedHandler(event, 'identification_type')}>RUC</option>
              </select>
              {!this.state.formData.identification_type.valid && this.state.formData.identification_type.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.identification_type.errorText}
                </div>
              ) : null}
            </div>
            <div className={cls.col25}>
              <label for="identificationNumber">N° de identificación:</label>
            </div>
            <div className={`${cls.col25} ${cls.fixNoPadding}`}>
              <input
                className={(!this.state.formData.identification.valid && this.state.formData.identification.touched) && cls.ContainerError}
                type="text"
                id="identification"
                name="identification"
                value={this.state.formData.identification.value}
                placeholder="00-000-000-000"
                onChange={(event) => this.inputChangedHandler(event, 'identification')}
              />
              {!this.state.formData.identification.valid && this.state.formData.identification.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.identification.errorText}
                </div>
              ) : null}
            </div>
          </div>
          <div className={cls.row}>
            <div className={cls.col25}>
              <label for="email">Correo electrónico:</label>
            </div>
            <div className={`${cls.col25} ${cls.fixNoPadding}`}>
              <input
                className={(!this.state.formData.email.valid && this.state.formData.email.touched) && cls.ContainerError}
                type="text"
                id="email"
                name="email"
                value={this.state.formData.email.value}
                placeholder="email@email.com"
                onChange={(event) => this.inputChangedHandler(event, 'email')}
              />
              {!this.state.formData.email.valid && this.state.formData.email.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.email.errorText}
                </div>
              ) : null}
            </div>
            <div className={cls.col25}>
              <label for="telephone">Teléfono:</label>
            </div>
            <div className={`${cls.col25} ${cls.fixNoPadding}`}>
              <input
                className={(!this.state.formData.telephone.valid && this.state.formData.telephone.touched) && cls.ContainerError}
                type="text"
                id="telephone"
                name="telephone"
                value={this.state.formData.telephone.value}
                placeholder="+593 00 000 0000"
                onChange={(event) => this.inputChangedHandler(event, 'telephone')}
              />
              {!this.state.formData.telephone.valid && this.state.formData.telephone.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.telephone.errorText}
                </div>
              ) : null}
            </div>
          </div>
          <div className={cls.row}>
            <div className={cls.col25}>
              <label for="address">Dirección:</label>
            </div>
            <div className={cls.col75}>
              <input
                className={(!this.state.formData.address.valid && this.state.formData.address.touched) && cls.ContainerError}
                type="text"
                id="address"
                name="address"
                value={this.state.formData.address.value}
                placeholder="Ecuador, Quito - Pichincha"
                onChange={(event) => this.inputChangedHandler(event, 'address')}
              />
              {!this.state.formData.address.valid && this.state.formData.address.touched ? (
                <div className={cls.ErrorText}>
                  {this.state.formData.address.errorText}
                </div>
              ) : null}
            </div>
          </div>
          <div className={cls.row}>
            {this.state.formIsValid ? (
              <button className={cls.submit} onClick={(event) => this.formInvoice(event)} >Guardar</button>
            ):(
              <button disabled className={cls.ButtonDisabled}><span>Guardar</span></button>
            )}
          </div>
          <button className={cls.buttonClose} onClick={this.handlerClose}>Cancelar</button>
        </form>
      )
    }
    return (
      <div className={cls.Div}>
        {this.props.invoices.length > 0 && this.state.openForm ? (
          <button className={cls.ButtonEdit} onClick={this.handlerOpenForm}><span>Nuevo</span></button>
        ):('')}
        <h3 className={cls.CardTitle}><span>Detalles de facturación</span></h3>
        <Grid className={cls.CardPrincipalAccount} container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={cls.Container}>
              {formReg}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.service.invoices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInvoices: (token) => dispatch(actions.invoices(token)),
    onCreatedInvoice: (token, formDataInvoice) => dispatch(actions.createdInvoice(token, formDataInvoice)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesDetails);