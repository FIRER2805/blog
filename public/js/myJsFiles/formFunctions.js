function deleteConfirmation(event, form)
{
    event.preventDefault();
    let confirmation = confirm("Você tem certeza que quer deletar esta categoria?");
    if(confirmation) {form.submit()}
}