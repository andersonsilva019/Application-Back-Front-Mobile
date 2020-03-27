import React, {useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import './style.css';

import heroesImg from '../../assets/heroes.png'             //Importando image 
import logoImg from '../../assets/logo.svg'                 //Importando a logo 


import api from '../../services/api'                        //Importando minha

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function headleLogon(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);

            history.push('/profile');
        }catch (err){
            alert('Falha no login, tente novamente.')
        }
    }


    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Ge The Hero"/>

                <form onSubmit={headleLogon}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <div className="areaButton">
                        <button type="submit" className="button" style={{marginRight: 2.5}}>Entrar</button>
                        <button type="submit" className="button" style={{marginLeft: 2.5}}>Deletar</button>
                    </div>

                    <Link className="back-link" to="/register">
                        <FiLogIn size = {16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt = "Heroes"/>
        </div>
    );
}