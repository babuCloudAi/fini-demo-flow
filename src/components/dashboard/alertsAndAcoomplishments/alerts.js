'use client';
import {Box} from '@mui/material';
import alertsData from '@/data/dashboard/alerts.json';

import Header from './header';
import AlertAccordion from './AlertAccordion';
import classes from './alerts.module.css';
import {useEffect, useState} from 'react';
import AlertsFooter from '@/components/alertsAndNudges/viewAll/alertsFooter';
import Card from './Card';

export default function Alerts() {
    const [selectedAlertsMap, setSelectedAlertsMap] = useState(new Map());
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [alertsWithIds, setAlertsWithIds] = useState([]);

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedAlerts = alertsWithIds.slice(startIndex, endIndex);
    const totalNumberOfPages = Math.ceil(alertsWithIds.length / pageSize);

    useEffect(() => {
        if (alertsData?.alerts?.length) {
            const enrichedAlerts = alertsData.alerts.map((alert, index) => ({
                ...alert,
                id: `${index}`
            }));
            setAlertsWithIds(enrichedAlerts);
        }
        setPageNumber(1);
        setSelectedAlertsMap(new Map());
    }, [alertsData]);

    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
        setSelectedAlertsMap(new Map());
    };

    const handleBulkAction = () => {
        const selectedAlertObjects = Array.from(selectedAlertsMap.values());
        console.log('Performing bulk action for:', selectedAlertObjects);
    };

    const isAllPaginatedSelected = () =>
        paginatedAlerts
            .flatMap(item => item.alerts)
            .every(alert => selectedAlertsMap.has(alert.id));

    const isSomePaginatedSelected = () => {
        const total = paginatedAlerts.flatMap(item => item.alerts).length;
        const selected = paginatedAlerts
            .flatMap(item => item.alerts)
            .filter(alert => selectedAlertsMap.has(alert.id)).length;

        return selected > 0 && selected < total;
    };

    const handleSelectAllChange = () => {
        setSelectedAlertsMap(prev => {
            const newMap = new Map(prev);
            const allChildAlerts = paginatedAlerts.flatMap(item =>
                item.alerts.map(alert => ({
                    ...alert,
                    student: item.student
                }))
            );
            const isAllSelected = isAllPaginatedSelected();
            if (isAllSelected || isSomePaginatedSelected()) {
                allChildAlerts.forEach(alert => newMap.delete(alert.id));
            } else {
                allChildAlerts.forEach(alert => newMap.set(alert.id, alert));
            }
            return newMap;
        });
    };

    const handleAlertSelection = alert => {
        setSelectedAlertsMap(prev => {
            const newMap = new Map(prev);
            if (newMap.has(alert.id)) {
                newMap.delete(alert.id);
            } else {
                newMap.set(alert.id, alert);
            }
            return newMap;
        });
    };

    const handleAccordionSelection = (studentItem, isChecked) => {
        const childAlerts = studentItem.alerts;
        setSelectedAlertsMap(prev => {
            const newMap = new Map(prev);
            childAlerts.forEach(alert => {
                const enrichedAlert = {
                    ...alert,
                    student: {
                        name: studentItem.student.name,
                        id: studentItem.student.id,
                        email: studentItem.student.email,
                        major: studentItem.student.major,
                        level: studentItem.student.level || 'N/A'
                    }
                };
                if (isChecked) {
                    newMap.set(alert.id, enrichedAlert);
                } else {
                    newMap.delete(alert.id);
                }
            });
            return newMap;
        });
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={3}
            className={classes.infinize__AlertsContainer}
        >
            <Header
                selectedAlertsMap={selectedAlertsMap}
                isChecked={isAllPaginatedSelected()}
                onChange={handleSelectAllChange}
                isIndeterminate={isSomePaginatedSelected()}
                title={'alert'}
            />

            {paginatedAlerts.map((item, index) => {
                const childAlerts = item.alerts;
                const enrichedAlerts = childAlerts.map(alert => ({
                    ...alert,
                    student: item.student
                }));

                const allSelected = enrichedAlerts.every(alert =>
                    selectedAlertsMap.has(alert.id)
                );
                const someSelected =
                    enrichedAlerts.some(alert =>
                        selectedAlertsMap.has(alert.id)
                    ) && !allSelected;

                return (
                    <Box key={index}>
                        <AlertAccordion
                            isChecked={allSelected}
                            isIndeterminate={someSelected}
                            onChange={() =>
                                handleAccordionSelection(item, !allSelected)
                            }
                            alert={{
                                name: item.student.name,
                                id: item.student.id,
                                email: item.student.email,
                                major: item.student.major,
                                level: item.student.level || 'N/A'
                            }}
                        >
                            <Box display="flex" flexDirection="column" gap={2}>
                                {childAlerts.map((alert, alertIndex) => (
                                    <Card
                                        key={alertIndex}
                                        isBulkActionEnabled={
                                            selectedAlertsMap.size > 0
                                        }
                                        isChecked={selectedAlertsMap.has(
                                            alert.id
                                        )}
                                        onChange={() =>
                                            handleAlertSelection({
                                                ...alert,
                                                student: item.student
                                            })
                                        }
                                        data={{
                                            title: alert.type,
                                            date: alert.date,
                                            description: alert.message
                                        }}
                                    />
                                ))}
                            </Box>
                        </AlertAccordion>
                    </Box>
                );
            })}

            <AlertsFooter
                selectedAlertsMap={selectedAlertsMap}
                startIndex={startIndex}
                endIndex={endIndex}
                totalCount={alertsWithIds.length}
                pageNumber={pageNumber}
                totalPages={totalNumberOfPages}
                handlePageChange={handlePageChange}
            />
        </Box>
    );
}
