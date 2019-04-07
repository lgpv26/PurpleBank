# PurpleBank
Sistema simulador de Contas Bancárias virtuais.  
Possibilidade de cadastro e login de usuários.  
Cada usuário com a conta já criada pode solicitar uma "PurpleConta" e usufruir de suas funcionalidades.

#### Funcionalidades:
  * Depósito.
  * Transferência para outra PurpleConta.
  * Adicionar contatos com suas respectivas contas.
  * Histórico de transação.
  * Adicionar foto de perfil.

## Demonstração
**Cadastro de usuário:**    
Cadastro com validação de CPF, Celular, Email, Senha, confirmação de senha no cliente e no servidor.
Caso as informações sejam invalidas, é apresentado para o usuário o que houve de errado em uma messagem no topo.
Assim que o cadastro é concluído, o usuário é redirecionado para a página de login.
![Cadastrando usuário](ApresentacaoPB/pb-apres-register.gif)  
  
**Login e criação da PurpleConta:**  
Login também com validação de CPF e senha, no lado do servidor e do cliente.
![Logando e criando purple conta](ApresentacaoPB/pb-apres-login.gif)

**Imagem de perfil:**  
Independente da resolução enviada, o back-end redimensiona a imagem para o tamanho ideal.  
As imagens são salvas no cloudinary e o path da imagem é salvo no banco de dados*
![Adicionando foto de perfil](ApresentacaoPB/pb-apres-profileImage.gif)

**Depósito:**  
Interface de depósito, o usuário pode depositar uma valor entre R$10,00 e R$50.000,00.
Ao clicar em depositar, automaticamente o banco de dados e a interface da conta bancánria é atualizada com o novo saldo. 
![Depositando na purple conta](ApresentacaoPB/pb-apres-deposit.gif)

**Contatos:**  
É possível adicionar, remover e buscar contatos.
![Adicionando e buscando contatos](ApresentacaoPB/pb-apres-contacts.gif)

**Transferindo a partir dos contatos:**  
Ao clicar em um contato específico, o usuário é redirecionado para a página de transferência com os valores do respectivo
contato preenchidos nos campos da interface. Restando apenas ao usuário checar a conta preenchida.
![Tranferindo dinheiro a partir dos contatos](ApresentacaoPB/pb-apres-contactsToTransfer.gif)

**Transferência:**  
Na primeira etapa é necessário preencher os dados da conta que vai receber a transferência, nessa fase a conta em questão
precisa existir no banco de dados, caso contrário será retornado um erro para o usuário revisar as informações preenchidas.  
Na segunda etapa, o usuário precisa preencher o valor à ser enviado, a descrição é opcional e irá aparecer o histórico de transação
(caso não seja preenchida, é salva no banco de dados com um valor padrão). O saldo não pode ser menor do que o valor a ser enviado,
caso contrário, o usuário será notificado que o saldo é insuficiente e não realizará a transferência.  
A terceira e ultima etapa é responsável por trazer todos os dados da transação para o usuário poder conferir.  
Ao clicar em transferir, é criado um objeto transação, o saldo no banco de dados e a interface dos envolvidos na transação
são atualizados com o novo valor.  
![Tranferindo dinheiro](ApresentacaoPB/pb-apres-transfer.gif)

**Histórico de transação:**  
Toda transação feita é salva no banco de dados, mas apenas as últimas 10 são apresentadas na interface por ordem de criação.  
O usuário pode buscar por tipo (Depósito/DEP, Transferência/TED e todas) e por descrição.
![Visualizando o histórico de transação](ApresentacaoPB/pb-apres-transactions.gif)

**Sessão expirada:**  
Depois de alguns segundos a sessão é expirada e o usuário tem que fazer o login novamente.
![Sessão expirada](ApresentacaoPB/pb-apres-tokenExpire.gif)

  
  
## Tecnologia utilizada
Projeto desenvolvido com:
  * Angular 7
  * Node.js + Express
  * MongoDB
  
