import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

