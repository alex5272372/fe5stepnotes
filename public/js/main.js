//for validation form
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
			noteTheme: $('#noteTheme').val(),
			noteTextarea: $('#noteTextarea').val()
		},
		success: function(response){
		  	window.location.href='/';
		},
		error: function(err){
		  console.log(err);
		}
	});
});