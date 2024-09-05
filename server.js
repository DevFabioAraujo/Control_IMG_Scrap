const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;


const formatDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};
//modificado

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use o caminho na rede interna
        const targetDir = `\\servidor\compartilhamento\uploads`;//Mudar para o caminho da pasta dentro da Rede
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        cb(null, targetDir);
    },
    filename: (req, file, cb) => {
        const serial = req.body.serial;
        if (!serial || serial.length > 10) {
            return cb(new Error('Serial inválido'));
        }
        const index = req.files.length + 1; 
        cb(null, `${serial}_${index}${path.extname(file.originalname)}`);
    }
});
//fim modificado
const upload = multer({
    storage,
    limits: { files: 4 } // Limite de 4 arquivos
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save-data', upload.array('photo', 4), (req, res) => {
    const serial = req.body.serial;
    const files = req.files;

   
    if (!serial || serial.length > 10) {
        return res.status(400).json({ message: 'Serial inválido. Deve ter no máximo 10 caracteres.' });
    }

   
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Nenhuma foto foi enviada.' });
    }

    res.json({ message: 'Dados recebidos com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
