const Needs = ({ needs, isEditMode, handleNeedChange, availableNeeds, selectedNeeds, setUpdatedNeeds, updatedNeeds, handleUpdateNeeds }) => {
    return (
      <div>
        <p>Needs:</p>
        {needs.map((need, index) => (
          <div key={index}>
            <p>{need.name}</p>
            {isEditMode && <button onClick={() => handleNeedChange(need, 'remove')}>Remove</button>}
          </div>
        ))}
        {isEditMode && (
          <>
            <select multiple value={selectedNeeds} onChange={e => handleNeedChange(e, 'select')}>
              {availableNeeds.map(need => (
                <option key={need._id} value={need._id}>{need.name}</option>
              ))}
            </select>
            <button onClick={() => setUpdatedNeeds([...updatedNeeds, ...selectedNeeds])}>Add Selected Needs</button>
            <button onClick={handleUpdateNeeds}>Update Needs</button>
          </>
        )}
      </div>
    );
  };
  
  export default Needs;