document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('id_cep').addEventListener('blur', function () {
        var cep = this.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número

        if (cep.length === 8) {
            var url = `https://viacep.com.br/ws/${cep}/json/`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        // Preenche os campos com as informações retornadas
                        document.getElementById('id_cidade').value = data.localidade;
                        document.getElementById('id_estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado!');
                        document.getElementById('id_cidade').value = '';
                        document.getElementById('id_estado').value = '';
                    }
                })
                .catch(error => {
                    alert('Erro ao buscar o CEP');
                    console.error(error);
                });
        }
    });
});
