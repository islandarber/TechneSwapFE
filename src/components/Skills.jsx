const Skills = ({ skills, isEditMode, handleSkillChange, availableSkills, selectedSkills, setUpdatedSkills, updatedSkills, handleUpdateSkills }) => {
    console.log(skills, 'skills')
    return (
      <div>
        <p>Skills:</p>
        {skills.length > 0 ? skills.map((skill, index) => (
          <div key={index}>
            <p>{skill.name}</p>
            {isEditMode && <button onClick={() => handleSkillChange(skill, 'remove')}>Remove</button>}
          </div>
        )): null}
        {isEditMode ? (
          <> 
            <select multiple value={selectedSkills} onChange={e => handleSkillChange(e, 'select')}>
              {availableSkills.length > 0 ? availableSkills.map(skill => (
                <option key={skill._id} value={skill._id}>{skill.name}</option>
              )): null}
            </select>
            <button onClick={() => setUpdatedSkills([...updatedSkills, ...selectedSkills])}>Add Selected Skills</button>
            <button onClick={handleUpdateSkills}>Update Skills</button>
          </>
        ): null}
      </div>
    );
  };
  
  export default Skills;