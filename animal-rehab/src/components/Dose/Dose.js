import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: '',
            weight: '',
            dilution: '',
            medAntibioticId: '',
            medPainRelieverId: '',
            medMiscId: '',
            volumesToGive: null
        }

        this.calculateVolumesToGive = this.calculateVolumesToGive.bind(this);
        this.renderDoseForm = this.renderDoseForm.bind(this);
        this.renderVolumesToGiveTable = this.renderVolumesToGiveTable.bind(this);
    }

    calculateVolumesToGive(dose, weight, dilution, pillStrength) {
        const volumeToGive = (dose / 1000 * weight * dilution / pillStrength);
        return String((volumeToGive).toFixed(3) +' cc');
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const medAntibiotic = this.props.medicine.find(med => String(med.id) === this.state.medAntibioticId);
        const medPainReliever = this.props.medicine.find(med => String(med.id) === this.state.medPainRelieverId);
        const medMisc = this.props.medicine.find(med => String(med.id) === this.state.medMiscId);

        const newVolumesToGive = [medAntibiotic, medPainReliever, medMisc]
            .filter(med => med)
            .map(med => {
                const dose = parseFloat(med.dose);
                const weight = parseFloat(this.state.weight);
                const dilution = parseFloat(this.state.dilution);
                const pillStrength = parseFloat(med.pillStrength);

                return {
                    id: med.id,
                    type: med.type,
                    name: med.name,
                    volumeToGive: this.calculateVolumesToGive(dose, weight, dilution, pillStrength)
                }
            })


        this.setState({
            volumesToGive: newVolumesToGive
        });
    }

    renderDoseForm() {
        return (
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h1>Calculate Dosage</h1>

                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='animalType'>
                            <label htmlFor='type'>Animal Type</label>
                            <input type='text' className='' placeholder='Type Of Animal' type='text' name='type' noValidate onChange={this.handleChange}>
                            </input>
                        </div>
                        <div className='animalWeight'>
                            <label htmlFor='weight'>Animal Weight (grams)</label>
                            <input type='text' className='' placeholder='Weight in grams' type='text' name='weight' noValidate onChange={this.handleChange}>
                            </input>
                        </div>
                        <div className='waterDilution'>
                            <label htmlFor='dilution'>Water Dilution (cc)</label>
                            <input type='int' ref={this.input} className='' placeholder='Water Dilution' type='text' name='dilution' noValidate onChange={this.handleChange}>
                            </input>
                        </div>
                        
                        <select required name="medAntibioticId" onChange={this.handleChange}>
                            <option value="">--Antibiotic--</option>
                            {this.props.medicine.map(med => {
                                if (med.type === 'antibiotic') {
                                    return (
                                        <option key={med.id} value={med.id}>{med.name}</option>
                                    );
                                }
                            })}
                        </select>

                        <select required name="medPainRelieverId" onChange={this.handleChange}>
                            <option value="">--Pain Reliever--</option>
                            {this.props.medicine.map(med => {
                                if (med.type === 'pain-reliever') {
                                    return (
                                        <option key={med.id} value={med.id}>{med.name}</option>
                                    );
                                }
                            })}
                        </select>

                        <select required name="medMiscId" onChange={this.handleChange}>
                            <option value="" hidden>--Miscellaneous--</option>
                            {this.props.medicine.map(med => {
                                if (med.type === 'misc') {
                                    return (
                                        <option key={med.id} value={med.id}>{med.name}</option>
                                    );
                                }
                            })}
                        </select>

                        <div className='findMeds'>
                            <button type='submit'>Calculate</button>
                        </div>
                    </form>
                </div>
                <section>
                    {this.state.volumesToGive && this.state.volumesToGive[0] ? this.renderVolumesToGiveTable() : null}
                </section>
            </div >
        );
    }

    renderVolumesToGiveTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Volumes to Give</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.volumesToGive.map(volumeToGive => (
                    <tr key={volumeToGive.id}>
                        <td>{volumeToGive.type}</td>
                        <td>{volumeToGive.name}</td>
                        <td>{volumeToGive.volumeToGive}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        if (this.props.medicine) {
            return this.renderDoseForm();
        } else {
            return <Redirect to="/" />
        }
    }
}

export default Dose;
