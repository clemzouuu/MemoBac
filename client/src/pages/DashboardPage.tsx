import { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import CardList from '../components/Cards/CardList';
import CardForm from '../components/Cards/CardForm';

const DashboardPage = () => {
    const [refreshList, setRefreshList] = useState(false);

    return (
        <div className="dashboard">
            <Navbar />
            <main>
                <h1>Mes fiches d'apprentissage</h1>
                <CardForm onCardCreated={() => setRefreshList(!refreshList)} />
                <CardList key={refreshList.toString()} />
            </main>
        </div>
    );
};

export default DashboardPage;