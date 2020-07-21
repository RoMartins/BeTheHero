import React, {useEffect, useState} from 'react';
import{Link, useHistory} from 'react-router-dom'
import {FiTrash2, FiPower} from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })    
    },[ongId])

    async function HandleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
            headers:{
                Authorization: ongId,
                    }
            }); 
        } catch (err) {
            alert('Erro ao deletar caso ')
        }
        setIncidents(incidents.filter(incident => incident.id != id));
    }

    function HandleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"/>
                <span>Bem vinda, {ongName} </span>

                <Link className="button" to="/incidents/new">
                Cadastrar novo caso
                </Link>
                
                <button onClick={HandleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

        <h1>
            Casos Cadastados
        </h1>
            <ul>
               {incidents.map( incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency:'BRL'}).format( incident.value)}</p>

                    <button onClick = { () => HandleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               ))}

            </ul>

        </div>
        );
}