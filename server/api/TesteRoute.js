const router = express.Router();

router.route('/testes')
    //Criar um novo teste
    .post(async (req, res) => {
        try {
            const novoTeste = new Teste({
                cadeira: req.body.cadeira,
                ano: req.body.ano,
                ano_criacao: req.body.ano_criacao,
                semestre: req.body.semestre,
                conteudo: req.body.conteudo,
                docente: req.body.docente,
            });
            const testeSalvo = await novoTeste.save();
            res.status(201).json(testeSalvo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    //Listar todos os testes
    .get(async (req, res) => {
        try {
            const testes = await Teste.find({});
            res.status(200).json(testes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
router.route('/testes/:id')
    //Editar todos os testes
    .put(async (req, res) => {
        try {
            const testeAtualizado = await Teste.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!testeAtualizado) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.status(200).json(testeAtualizado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    //listar um teste
    .get(async (req, res) => {
        try {
            const teste = await Teste.findById(req.params.id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.status(200).json(teste);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    //apagar um teste
    .delete(async (req, res) => {
        try {
            const testeRemovido = await Teste.findByIdAndRemove(req.params.id);
            if (!testeRemovido) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.status(200).json({ message: 'Teste removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })


router.route('/testes/filtrar').get(async (req, res) => {
    try {
        const { cadeira, ano, ano_criacao, semestre, docente } = req.query;

        const filtro = {};
        if (cadeira) filtro.cadeira = cadeira;
        if (ano) filtro.ano = ano;
        if (ano_criacao) filtro.ano_criacao = ano_criacao;
        if (semestre) filtro.semestre = semestre;
        if (docente) filtro.docente = docente;

        const testesFiltrados = await Teste.find(filtro);
        if (testesFiltrados.length === 0) {
            return res.status(404).json({ message: 'Nenhum teste encontrado com os filtros fornecidos' });
        }
        res.status(200).json(testesFiltrados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;