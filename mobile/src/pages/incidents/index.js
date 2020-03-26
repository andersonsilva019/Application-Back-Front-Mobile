import React,{ useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'


export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);                  //Total de casos
    const [page, setPage] = useState(1);
    const [loading, setLoanding] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail',{ incident });
    }
    
    async function loadIncidents(){

        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total ){
            return;
        }

        setLoanding(true);

        const response = await api.get('incidents',{
            params: { page }
        });

        
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoanding(false);
    }


    useEffect(() => {
        loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} caso(s)</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{ 
                            style:'currency', 
                            currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.datailButton} 
                            onPress={() => navigationToDetail(incident)}
                        >
                            <Text style={styles.datailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}