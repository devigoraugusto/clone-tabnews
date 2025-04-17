function status(request, response) {
  response
    .status(200)
    .json({ chave: "Alunos do curso curso.dev são os melhores!" });
}

export default status;
