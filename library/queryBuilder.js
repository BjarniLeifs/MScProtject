
module.exports = {
	
	insert: () => {
		return null;
	},
	
	get: () => {
		return null;
	},
	
	update: (updateTable, where ,data) => {

    	try {
			let length = Object.keys(data).length;
			let count = 0;
			let buildString = 'UPDATE '+ updateTable + ' SET ';
			let error;

			let dataBuilt = [];
			for(let item in data) {
				count += 1;
				if (count == length) {
					buildString += '' + item + ' = ($' + count + ') ';
					dataBuilt.push(data[item]);

				} else {
					buildString += '' + item + ' = ($' + count + '), ';
					dataBuilt.push(data[item]);
				}
				error = false;
			}
			count += 1;
			buildString += ' where ' + where + ' = ' + '($' + count + ') returning *';
			dataBuilt.push(data.ID);
      	} catch(e) {
      		error = e;
      	}

		return {
			table    : updateTable,
			property : where,
			itemNumb : count,
			err 	 : error, 
			string   : buildString,
			value    : data
		};
	},

	delete: () => {
		return null;
	},

	set: () => {
		return null;
	}
	
/* exports ends */
};

