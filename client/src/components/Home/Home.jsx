import { useUserScoreQuery, useUpdateUserScoreMutation } from "../../features/api/userAuth/userAuth"; 
import { useState } from "react";

const Home = () => {
    // Retrieve the user ID from local storage
    const userId = JSON.parse(localStorage.getItem('userId')); 

    // Fetch the user's score and position if userId exists
    const { data, error, isLoading, refetch } = useUserScoreQuery(userId);
    const [updateUserScore] = useUpdateUserScoreMutation();

    // State to control modal visibility and score input
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newScore, setNewScore] = useState(data?.data?.score || '');

    // Open modal and populate current score
    const handleEditClick = () => {
        setNewScore(data?.data?.score || '');
        setIsModalOpen(true);
    };

    // Handle score update
    const handleUpdateScore = async () => {
        try {
            await updateUserScore({ id: userId, score: newScore });
            await refetch();
            setIsModalOpen(false); // Close modal on success
        } catch (err) {
            console.error("Failed to update score:", err);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Score</h2>

                    {/* Display loading, error, or score data */}
                    {isLoading && <p className="text-center text-gray-500">Loading...</p>}
                    {error && <p className="text-center text-red-500">An error occurred: {error.message}</p>}
                    
                    {data && (
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">Score: {data?.data?.score}</p>
                            {/* Conditionally display position message */}
                            <p className="text-lg font-medium text-gray-700">
                                {data?.data?.position <= 10
                                    ? "You're in the top 10 positions!"
                                    : `Position: ${data?.data?.position}`}
                            </p>
                            <button 
                                onClick={handleEditClick}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Edit Score
                            </button>
                        </div>
                    )}
                    
                    {/* Modal for Editing Score */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h3 className="text-lg font-semibold mb-4">Edit Score</h3>
                                
                                <label className="block text-gray-700">Current Score</label>
                                <input 
                                    type="number" 
                                    value={newScore} 
                                    onChange={(e) => setNewScore(e.target.value)} 
                                    className="mt-2 p-2 border rounded-md w-full" 
                                />
                                
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button 
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleUpdateScore}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
