
module.exports = {
	/*
	This is do insert new things into the database. Meaning the inserTable is information string on which table this is
	while the data is the data it serlf. This allows the function to make string insert into "name of table" (property2, property2) values ($1, $2)
	Then it returns it with ofther informaiton as an object. See return statement.
	*/
	insert: (insertTable, data) => {
		try {
			let length = Object.keys(data).length;
			let buildString = 'INSERT INTO '+ insertTable + '(';
			let values ='(';
			let finalString = '';
			let dataBuilt = [];
			let count = 0;
			let error;
			
		// Building the iteration to string, such it uses correct way in the system to hanlde any sql injections. 
			for(let item in data) {
				count += 1;
				if (count < length) {
					values += '$'+count;
					buildString += item+',';
				} else {
					buildString = item +')';	
					values += '$'+count+')';
				}
				dataBuilt.push(item.data);
			}
			finalString = buildString + values;

		} catch (e) {
			error = e;
		}
		return {
			table    : updateTable,
			itemNumb : count,
			err 	 : error, 
			string   : finalString,
			value    : data
		};
	},
	
	get: () => {
		return null;
	},
	/*
		updateTable is the name of the table to update, this is mainly because it is dynamicly made.
		where is the property string name, id or other that needs to match for the update. 
		data is the data, {name : *, ssn : 2}... this will then be built up from that information 
		such as it will then return the value and string to use.  See return statement. 
	*/
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

