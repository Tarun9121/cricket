import matchesList from './matchesList';

const dummySeriesList = [
    {
        id: "1e0a45c0-49a1-4a6a-9e5f-718d7fabcde1",
        format: "Test Series",
        name: "Ashes 2024",
        startDate: "2024-06-01",
        endDate: "2024-06-15",
        winner: "Australia",
        isDeleted: false,
        // matches: matchesList  // Use the imported matches data
    },
    {
        id: "2b1b4c7d-02f3-4bc5-8d7a-1f2f0b3a1e02",
        format: "One Day International",
        name: "World Cup 2024",
        startDate: "2024-10-01",
        endDate: "2024-11-05",
        winner: "India",
        isDeleted: false,
        // matches: [] // No matches yet
    },
    {
        id: "3c2c7d4e-11a4-4f5b-9e6a-3f4b1c8e3f04",
        format: "T20 Series",
        name: "Big Bash League",
        startDate: "2024-12-01",
        endDate: "2024-12-25",
        winner: "Sydney Sixers",
        isDeleted: true,
        // matches: [] // No matches yet
    }
];

export default dummySeriesList;
