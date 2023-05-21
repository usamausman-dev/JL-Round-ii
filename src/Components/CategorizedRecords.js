import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UtilityBills from './UtilityBills';
import Medicine from './Medicine';
import FamilySupport from './FamilySupport';
import Loan from './Loan';
import Others from './Others';
import axios from 'axios';
import { useSession } from 'next-auth/react'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span" >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function CategorizedRecords() {
    const [value, setValue] = useState(0);
    const [utility, setUtility] = useState([])
    const [med, setMed] = useState([])
    const [family, setFamily] = useState([])
    const [loanExp, setLoanExp] = useState([])
    const [othersExp, setOthersExp] = useState([])

    const { data: session, status } = useSession()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const payload = {}

    useEffect(() => {
        axios.get('http://localhost:3000/api/GetAllExpense')
            .then(function (response) {
                console.log(response.data.data)


                let loans = response.data.data.filter(function (creature) {
                    return creature.expenseCategory == "Loan";
                });

                setLoanExp(loans)

                let utilityBills = response.data.data.filter(function (creature) {
                    return creature.expenseCategory == "Utility Bills";
                });

                setUtility(utilityBills)


                let FamilySupport = response.data.data.filter(function (creature) {
                    return creature.expenseCategory == "Family Support";
                });

                setFamily(FamilySupport)


                let Others = response.data.data.filter(function (creature) {
                    return creature.expenseCategory == "Others";
                });

                setOthersExp(Others)


                let Medicine = response.data.data.filter(function (creature) {
                    return creature.expenseCategory == "Medicine";
                });

                setMed(Medicine)



            }).catch((e) => {
                console.log(e)
            })

    }, [])



    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Utility Bills" {...a11yProps(0)} />
                    <Tab label="Medicine" {...a11yProps(1)} />
                    <Tab label="Family Support" {...a11yProps(2)} />
                    <Tab label="Loan" {...a11yProps(3)} />
                    <Tab label="Others" {...a11yProps(4)} />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UtilityBills data={utility} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Medicine data={med} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FamilySupport data={family} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Loan data={loanExp} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Others data={othersExp} />
            </TabPanel>
        </Box>
    )
}

export default CategorizedRecords