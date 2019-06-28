//for validation form - boodtrap4
(function() {
	'use strict';
	window.addEventListener('load', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		const validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

//ajax for DEL\EDIT
$('#form-button__note').on('click', '#noteDelBtn', function(event) {
	event.preventDefault();
	$.ajax({
		type:'DELETE',
		url: '/api/notes/' + $('#form-button__note').attr('data-id'),
		success: function(response){
			window.location.href='/';
		},
		error: function(err){
			console.log(err);
		}
	});
}).on('click', '#noteEditBtn', function(event) {
	event.preventDefault();
	$.ajax({
		type:'PUT',
		url: '/api/notes/' + $('#form-button__note').attr('data-id'),
		data: {
			themeNote: $('#themeNote').val(),
			textNote: $('#textNote').val()
		},
		success: function(response){
			window.location.href='/';
		},
		error: function(err){
			console.log(err);
		}
	});
});

$('.note').click(function () {
	const idNote = $(this).attr('data-id');
	$.getJSON('/notes/'+idNote, function(json) {
		$('#themeNote')[0].value = json.themeNote;
		$('#textNote')[0].value = json.textNote;
		$('#form-button__note').attr('data-id',idNote);
		$('#noteModal').modal('show');
	});
});

$('#noteModal').on('show.bs.modal', function (e) {
	if ($('#form-button__note').attr('data-id').length) {
		$('#noteCreate').hide();
	} else {
		$('#form-button__note').hide();
	}
}).on('hidden.bs.modal', function (e) {
	$('#themeNote').val("");
	$('#textNote').val("");
	$('#noteCreate').show();
	$('#form-button__note').show();
	$('#form-button__note').attr('data-id', '');
});

// -------- Work with lists --------

const appendItem = function(index) {
	$('#itemsList').append(`
				<div class="input-group mb-2">
				    <div class="input-group-prepend">
				        <div class="input-group-text">
				            <input type="checkbox" id="checkItem${index}">
				        </div>
				    </div>
				    <input type="text" class="form-control" id="textItem${index}">
				</div>`);
};

$('.list').click(function () {
	let idList = $(this).attr('data-id');

	$.getJSON(`/lists/${idList}`, function(json) {
		$('#themeList')[0].value = json.themeList;

		if (json.itemsList.length > 0) {
			$('#checkItem0')[0].checked = json.itemsList[0].itemChecked;
			$('#textItem0')[0].value = json.itemsList[0].itemText;
		}

		for (let index = 1; index < json.itemsList.length; index++) {
			appendItem(index);
			$(`#checkItem${index}`)[0].checked = json.itemsList[index].itemChecked;
			$(`#textItem${index}`)[0].value = json.itemsList[index].itemText;
		}

		$('#listModal>.modal-dialog>.modal-content').attr('data-id', idList);
		$('#listModal').modal('show');
	});
});

$('#listModal').on('show.bs.modal', function (e) {
	if ($('#listModal>.modal-dialog>.modal-content').attr('data-id').length) {
		$('#addList').hide();
	} else {
		$('#editList').hide();
		$('#delList').hide();
	}
}).on('hidden.bs.modal', function (e) {
	$('#itemsList>.input-group:nth-child(n+2)').remove();

	$('#addList').show();
	$('#editList').show();
	$('#delList').show();

	$('#listModal>.modal-dialog>.modal-content').attr('data-id', '');
	$('#themeList')[0].value = '';
	$('#checkItem0')[0].checked = false;
	$('#textItem0')[0].value = '';
});

$('#addItem').click(function () {
	appendItem($('#itemsList>.input-group').length);
});

$('#delItem').click(function () {
	if ($('#itemsList>.input-group').length > 1) $('#itemsList>.input-group:last-child').remove();
});

$('#addList').click(function () {
	$.ajax({
		type:'POST',
		url: '/lists',
		data: JSON.stringify({
			themeList: $('#themeList')[0].value,
			itemsList: Array.prototype.map.call($('#itemsList>.input-group'), function(groupItem) {
				return {
					itemChecked: $(groupItem).find('.input-group-text input')[0].checked,
					itemText: $(groupItem).find('.form-control')[0].value
				}
			})
		}),
		contentType: "application/json",
		success: function(res){
			$('#listModal').modal('hide');
			window.location.href='/';
		},
		error: function(err){
			console.err(err);
		}
	});
});

$('#editList').click(function () {
	$.ajax({
		type:'PUT',
		url: `/api/lists/${$('#listModal>.modal-dialog>.modal-content').attr('data-id')}`,
		data: JSON.stringify({
			themeList: $('#themeList')[0].value,
			itemsList: Array.prototype.map.call($('#itemsList>.input-group'), function(groupItem) {
				return {
					itemChecked: $(groupItem).find('.input-group-text input')[0].checked,
					itemText: $(groupItem).find('.form-control')[0].value
				}
			})
		}),
		contentType: "application/json",
		success: function(res){
			$('#listModal').modal('hide');
			window.location.href='/';
		},
		error: function(err){
			console.err(err);
		}
	});
});

$('#delList').click(function () {
	$.ajax({
		type:'DELETE',
		url: `/api/lists/${$('#listModal>.modal-dialog>.modal-content').attr('data-id')}`,
		success: function(res){
			$('#listModal').modal('hide');
			window.location.href='/';
		},
		error: function(err){
			console.err(err);
		}
	});
});