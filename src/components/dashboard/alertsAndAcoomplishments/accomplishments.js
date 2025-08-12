'use client';
import {Box} from '@mui/material';
import accomplishmentsData from '@/data/dashboard/accomplishments.json';
import Header from './header';
import AccomplishmentAccordion from './AlertAccordion';
import Card from './Card';
import classes from './alerts.module.css';
import {useEffect, useState} from 'react';
import AlertsFooter from '@/components/alertsAndNudges/viewAll/alertsFooter';

export default function Accomplishments() {
    const [selectedAccomplishmentsMap, setSelectedAccomplishmentsMap] =
        useState(new Map());
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [accomplishmentsWithIds, setAccomplishmentsWithIds] = useState([]);

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedAccomplishments = accomplishmentsWithIds.slice(
        startIndex,
        endIndex
    );
    const totalNumberOfPages = Math.ceil(
        accomplishmentsWithIds.length / pageSize
    );

    useEffect(() => {
        if (accomplishmentsData?.accomplishments?.length) {
            const enriched = accomplishmentsData.accomplishments.map(
                (accomplishment, index) => ({
                    ...accomplishment,
                    id: `${index}`
                })
            );
            setAccomplishmentsWithIds(enriched);
        }
        setPageNumber(1);
        setSelectedAccomplishmentsMap(new Map());
    }, [accomplishmentsData]);

    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
        setSelectedAccomplishmentsMap(new Map());
    };

    const handleBulkAction = () => {
        const selectedItems = Array.from(selectedAccomplishmentsMap.values());
        console.log('Performing bulk action for:', selectedItems);
    };

    const isAllPaginatedSelected = () =>
        paginatedAccomplishments
            .flatMap(item => item.accomplishments)
            .every(accomplishment =>
                selectedAccomplishmentsMap.has(accomplishment?.id)
            );

    const isSomePaginatedSelected = () => {
        const total = paginatedAccomplishments.flatMap(
            item => item.accomplishments
        ).length;
        const selected = paginatedAccomplishments
            .flatMap(item => item.accomplishments)
            .filter(accomplishment =>
                selectedAccomplishmentsMap.has(accomplishment?.id)
            ).length;

        return selected > 0 && selected < total;
    };

    const handleSelectAllChange = () => {
        setSelectedAccomplishmentsMap(prev => {
            const newMap = new Map(prev);
            const allChild = paginatedAccomplishments.flatMap(item =>
                item.accomplishments.map(accomplishment => ({
                    ...accomplishment,
                    student: item.student
                }))
            );
            const isAllSelected = isAllPaginatedSelected();
            if (isAllSelected || isSomePaginatedSelected()) {
                allChild.forEach(acc => newMap.delete(acc.id));
            } else {
                allChild.forEach(acc => newMap.set(acc.id, acc));
            }
            return newMap;
        });
    };

    const handleAccomplishmentSelection = accomplishment => {
        setSelectedAccomplishmentsMap(prev => {
            const newMap = new Map(prev);
            if (newMap.has(accomplishment.id)) {
                newMap.delete(accomplishment.id);
            } else {
                newMap.set(accomplishment.id, accomplishment);
            }
            return newMap;
        });
    };

    const handleAccordionSelection = (studentItem, isChecked) => {
        const childAccomplishments = studentItem.accomplishments;
        setSelectedAccomplishmentsMap(prev => {
            const newMap = new Map(prev);
            childAccomplishments.forEach(acc => {
                const enriched = {
                    ...acc,
                    student: {
                        name: studentItem.student.name,
                        id: studentItem.student.id,
                        email: studentItem.student.email,
                        major: studentItem.student.major,
                        level: studentItem.student.level || 'N/A'
                    }
                };
                if (isChecked) {
                    newMap.set(acc.id, enriched);
                } else {
                    newMap.delete(acc.id);
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
                selectedAlertsMap={selectedAccomplishmentsMap}
                isChecked={isAllPaginatedSelected()}
                onChange={handleSelectAllChange}
                isIndeterminate={isSomePaginatedSelected()}
            />

            {paginatedAccomplishments.map((item, index) => {
                const childAccomplishments = item.accomplishments;
                const enrichedAccomplishments = childAccomplishments.map(
                    acc => ({
                        ...acc,
                        student: item.student
                    })
                );

                const allSelected = enrichedAccomplishments.every(acc =>
                    selectedAccomplishmentsMap.has(acc.id)
                );
                const someSelected =
                    enrichedAccomplishments.some(acc =>
                        selectedAccomplishmentsMap.has(acc.id)
                    ) && !allSelected;

                return (
                    <Box key={index}>
                        <AccomplishmentAccordion
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
                                {childAccomplishments.map((acc, accIndex) => (
                                    <Card
                                        key={accIndex}
                                        isBulkActionEnabled={
                                            selectedAccomplishmentsMap.size > 0
                                        }
                                        isChecked={selectedAccomplishmentsMap.has(
                                            acc.id
                                        )}
                                        onChange={() =>
                                            handleAccomplishmentSelection({
                                                ...acc,
                                                student: item.student
                                            })
                                        }
                                        data={{
                                            title: acc.type,
                                            date: acc.date,
                                            description: acc.message
                                        }}
                                    />
                                ))}
                            </Box>
                        </AccomplishmentAccordion>
                    </Box>
                );
            })}

            <AlertsFooter
                selectedAlertsMap={selectedAccomplishmentsMap}
                startIndex={startIndex}
                endIndex={endIndex}
                totalCount={accomplishmentsWithIds.length}
                pageNumber={pageNumber}
                totalPages={totalNumberOfPages}
                handlePageChange={handlePageChange}
            />
        </Box>
    );
}
