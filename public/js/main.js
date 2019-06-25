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
//ajax for DEL
$('.form-button__note').on('click', '#noteDelBtn', function(event) {
    event.preventDefault();
	const id = $(this).attr('data-id');
	$.ajax({
		type:'DELETE',
		url: '/api/notes/' + id,
		success: function(response){
		  	window.location.href='/';
		},
		error: function(err){
		  console.log(err);
		}
	});
});
//ajax for EDIT
$('.form-button__note').on('click', '#noteEditBtn', function(event) {
    event.preventDefault();
	const id = $(this).attr('data-id');
	$.ajax({
		type:'PUT',
		url: '/api/notes/' + id,
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

$('.note').click(function () {
	$.getJSON(`/notes/${this.id}`, function(json) {
		$('#themeNote')[0].value = json.themeNote;
		$('#textNote')[0].value = json.textNote;
		$('#noteModal').modal('show');
	});
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
	let id = this.id;

	$.getJSON(`/lists/${id}`, function(json) {
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

		$('#listModal>.modal-dialog>.modal-content')[0].id = id;
		$('#listModal').modal('show');
	});
});

$('#listModal').on('show.bs.modal', function (e) {
	if ($('#listModal>.modal-dialog>.modal-content')[0].id.length) {
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
	$('#listModal>.modal-dialog>.modal-content')[0].id = '';
});

$('#addItem').click(function () {
	appendItem($('#itemsList>.input-group').length);
});

$('#delItem').click(function () {
	if ($('#itemsList>.input-group').length > 1) $('#itemsList>.input-group:last-child').remove();
});

$('#addList').click(function () {
	/*$.post({
		url: '/lists',
		dataType: 'json',
		data: JSON.stringify({
			themeList: $('#themeList')[0].value,
			itemsList: [
				{
					itemChecked: true,
					itemText: 'Item 1'
				},
				{
					itemChecked: false,
					itemText: 'Item 2'
				},
				{
					itemChecked: true,
					itemText: 'Item 3'
				}
			]
			/!*itemsList: Array.prototype.forEach.call($('#itemsList>.input-group'), function(groupItem) {

			})*!/
		}),
		success: function(res){
			// $('#listModal').modal('hide');
		},
		error: function(err){
			console.err(err);
		}
	});*/
});

$('#editList').click(function () {

});

$('#delList').click(function () {

});
