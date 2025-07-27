document.addEventListener('DOMContentLoaded', () => {
            const seasonsData = [
                { temporada: 1, episodios: 22, exibido: '2005-2006', estreia: '13 de setembro de 2005', final: '4 de maio de 2006', emissora: 'The WB' },
                { temporada: 2, episodios: 22, exibido: '2006-2007', estreia: '28 de setembro de 2006', final: '17 de maio de 2007', emissora: 'The CW' },
                { temporada: 3, episodios: 16, exibido: '2007-2008', estreia: '4 de outubro de 2007', final: '15 de maio de 2008', emissora: 'The CW' },
                { temporada: 4, episodios: 22, exibido: '2008-2009', estreia: '18 de setembro de 2008', final: '14 de maio de 2009', emissora: 'The CW' },
                { temporada: 5, episodios: 22, exibido: '2009-2010', estreia: '10 de setembro de 2009', final: '13 de maio de 2010', emissora: 'The CW' },
                { temporada: 6, episodios: 22, exibido: '2010-2011', estreia: '24 de setembro de 2010', final: '20 de maio de 2011', emissora: 'The CW' },
                { temporada: 7, episodios: 23, exibido: '2011-2012', estreia: '23 de setembro de 2011', final: '18 de maio de 2012', emissora: 'The CW' },
                { temporada: 8, episodios: 23, exibido: '2012-2013', estreia: '3 de outubro de 2012', final: '15 de maio de 2013', emissora: 'The CW' },
                { temporada: 9, episodios: 23, exibido: '2013-2014', estreia: '8 de outubro de 2013', final: '20 de maio de 2014', emissora: 'The CW' },
                { temporada: 10, episodios: 23, exibido: '2014-2015', estreia: '7 de outubro de 2014', final: '20 de maio de 2015', emissora: 'The CW' },
                { temporada: 11, episodios: 23, exibido: '2015-2016', estreia: '7 de outubro de 2015', final: '25 de maio de 2016', emissora: 'The CW' },
                { temporada: 12, episodios: 23, exibido: '2016-2017', estreia: '13 de outubro de 2016', final: '18 de maio de 2017', emissora: 'The CW' },
                { temporada: 13, episodios: 23, exibido: '2017-2018', estreia: '12 de outubro de 2017', final: '17 de maio de 2018', emissora: 'The CW' },
                { temporada: 14, episodios: 20, exibido: '2018-2019', estreia: '11 de outubro de 2018', final: '25 de abril de 2019', emissora: 'The CW' },
                { temporada: 15, episodios: 20, exibido: '2019-2020', estreia: '10 de outubro de 2019', final: '19 de novembro de 2020', emissora: 'The CW' }
            ];

            let currentSort = {
                column: 'temporada',
                direction: 'asc'
            };

            function displayKeyStats() {
                const totalSeasons = seasonsData.length;
                const totalEpisodes = seasonsData.reduce((sum, season) => sum + season.episodios, 0);
                const startYear = seasonsData[0].exibido.split('-')[0];
                const endYear = seasonsData[seasonsData.length - 1].exibido.split('-')[1];
                const yearsOnAir = `${startYear}-${endYear}`;
                const networks = new Set(seasonsData.map(s => s.emissora));

                document.getElementById('total-seasons').textContent = totalSeasons;
                document.getElementById('total-episodes').textContent = totalEpisodes;
                document.getElementById('years-on-air').textContent = yearsOnAir;
                document.getElementById('networks').textContent = networks.size;
            }

            function createEpisodesChart() {
                const ctx = document.getElementById('episodesChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: seasonsData.map(s => `Temporada ${s.temporada}`),
                        datasets: [{
                            label: 'Número de Episódios',
                            data: seasonsData.map(s => s.episodios),
                            backgroundColor: 'rgba(194, 128, 4, 0.7)', // Um tom de âmbar/dourado
                            borderColor: 'rgba(194, 128, 4, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#475569' // slate-600
                                },
                                grid: {
                                    color: '#A5A692' // slate-200
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#475569' // slate-600
                                },
                                grid: {
                                    display: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: '#1e293b', // slate-800
                                titleFont: { size: 16 },
                                bodyFont: { size: 14 },
                                displayColors: false
                            }
                        }
                    }
                });
            }

            function renderTable() {
                const tableBody = document.getElementById('seasons-table-body');
                tableBody.innerHTML = '';
                seasonsData.forEach(season => {
                    const row = `
                        <tr class="border-b transition duration-300 ease-in-out hover:bg-slate-50">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">${season.temporada}</td>
                            <td class="whitespace-nowrap px-6 py-4">${season.episodios}</td>
                            <td class="whitespace-nowrap px-6 py-4">${season.exibido}</td>
                            <td class="whitespace-nowrap px-6 py-4">${season.estreia}</td>
                            <td class="whitespace-nowrap px-6 py-4">${season.final}</td>
                            <td class="whitespace-nowrap px-6 py-4">${season.emissora}</td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            }

            function sortData(column) {
                const direction = (currentSort.column === column && currentSort.direction === 'asc') ? 'desc' : 'asc';
                
                seasonsData.sort((a, b) => {
                    let valA = a[column];
                    let valB = b[column];

                    if (typeof valA === 'string') {
                        // For date sorting
                        if (column === 'estreia' || column === 'final') {
                           valA = new Date(valA.split(' de ').reverse().join(' '));
                           valB = new Date(valB.split(' de ').reverse().join(' '));
                        } else {
                           valA = valA.toLowerCase();
                           valB = valB.toLowerCase();
                        }
                    }
                    
                    if (valA < valB) return direction === 'asc' ? -1 : 1;
                    if (valA > valB) return direction === 'asc' ? 1 : -1;
                    return 0;
                });

                currentSort = { column, direction };

                // Update sort indicators
                document.querySelectorAll('.sortable').forEach(th => {
                    th.classList.remove('sort-asc', 'sort-desc');
                    if (th.dataset.sort === column) {
                        th.classList.add(direction === 'asc' ? 'sort-asc' : 'sort-desc');
                    }
                });

                renderTable();
            }

            function addTableSorting() {
                document.querySelectorAll('.sortable').forEach(header => {
                    header.addEventListener('click', () => {
                        sortData(header.dataset.sort);
                    });
                });
            }

            // Initial setup
            displayKeyStats();
            createEpisodesChart();
            sortData('temporada'); // Initial sort
            addTableSorting();
        });
    