function skillsMember() {
	$.ajax({
		url: '/api/skills',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var skill = data.skills;
			var skillLength = skill.length;
			var html = '';
			for (var i = 0; i < skillLength; i++) {
				html += '<div class="col-md-3 col-sm-6 col-xs-12">';
				html += '<div class="member">';
				html += '<div class="member-img">';
				html += '<img src="images/member/member-1.jpg" alt="member" class="img-responsive">';
				html += '</div>';
				html += '<div class="member-info">';
				html += '<h4>'+skill[i].name+'</h4>';
				html += '<span>'+skill[i].description+'</span>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			}
			$('#skills-member').html(html);
		},
		error: function() {
			console.log('error');
		}
	});
}