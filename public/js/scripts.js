document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);
    const photos = form.querySelectorAll('input[type="file"]');
    
    if (photos.length > 4) {
        alert('Você pode enviar no máximo 4 fotos.');
        return;
    }

    fetch('/save-data', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        form.reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar os dados.');
    });
});

function addPhotoField() {
    const photoContainer = document.getElementById('photoContainer');
    const currentPhotoCount = photoContainer.querySelectorAll('input[type="file"]').length;

    if (currentPhotoCount >= 4) {
        alert('Você pode adicionar no máximo 4 fotos.');
        return;
    }

    const newField = document.createElement('input');
    newField.type = 'file';
    newField.name = 'photo';
    newField.required = true;
    photoContainer.appendChild(newField);
    photoContainer.appendChild(document.createElement('br'));
    photoContainer.appendChild(document.createElement('br'));
}
