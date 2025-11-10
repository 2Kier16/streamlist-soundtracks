import React, { useState } from 'react';

function StreamList() {
    const [soundtrack, setSoundtrack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefanult();
        console.log('Soundtrack added:', soundtrack);
        setSoundtrack('');
    };

    return (
        <div className='streamlist-container'>
            <h2>Stream List: Movie Soundtrack Edition</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={soundtrack}
                onChange={(e) => setSoundtrack(e.target.value)}
                placeholder='Enter a movie soundtrack or composer'
                />
                <button type='submit'>Add to List</button>
            </form>
        </div>

    );
}

export default StreamList;