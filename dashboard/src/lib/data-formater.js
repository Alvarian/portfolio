const mapIfSlidesExist = async (dataArr, prisma) => {
	const newDataArr = dataArr.map(async row => {
		const { deployed_url, game_file, style_file, id } = row;

		if (!deployed_url && !game_file && !style_file) {
			const result = await prisma.services.findMany({
				orderBy: [
					{
						id: "desc",
					}
				],
				where: {project_id: id} 
			});

			row.slides = result;

			return row;
		} else {
			return row;
		}
	});

	const promises = await Promise.all(newDataArr);

	return promises;
};


module.exports = {
	mapIfSlidesExist	
};