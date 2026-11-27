/* Idiomas do Portal BI MCPack: PT (original), EN e ES (espanhol latino-americano).
   Traduz a tela já renderizada (texto, placeholder, aria-label, title, alert e confirm),
   sem mexer nos dados. A escolha fica salva no navegador (chave "portal-lang").
   Para traduzir um texto novo, basta incluí-lo em DICT: 'texto em PT': ['EN', 'ES']. */
(function () {
  'use strict';
  var LANGS = ['pt', 'en', 'es'];
  var KEY = 'portal-lang';

  function pick() {
    var s = null; try { s = localStorage.getItem(KEY); } catch (e) {}
    return LANGS.indexOf(s) >= 0 ? s : 'pt';   /* padrão: português, até a pessoa escolher */
  }
  var LANG = pick();

  var DICT = {
    /* Massagem: prévia */
    "Massagem": ["Massage","Masaje"],
    "Mass.": ["Mass.","Mas."],
    "Massagem e bem-estar": ["Massage and well-being","Masaje y bienestar"],
    "Agende seu horário semanal de bem-estar.": ["Book your weekly wellness session.","Reserva tu sesión semanal de bienestar."],
    "Programa de qualidade de vida MCPack": ["MCPack well-being program","Programa de bienestar MCPack"],
    "Prévia de desenvolvimento": ["Development preview","Vista previa de desarrollo"],
    "Agendar massagem": ["Book a massage","Reservar masaje"],
    "Atendimentos normalmente às terças-feiras.": ["Sessions usually take place on Tuesdays.","Las sesiones suelen realizarse los martes."],
    "Agendamento ainda indisponível": ["Booking not yet available","Reservas aún no disponibles"],
    "A integração com o Teams está em preparação. Nenhuma reserva real será criada.": ["Teams integration is being prepared. No actual booking will be created.","La integración con Teams está en preparación. No se creará ninguna reserva real."],
    "Horários disponíveis": ["Available times","Horarios disponibles"],
    "Exemplos de horários, sujeitos à programação definitiva.": ["Sample times, subject to the final schedule.","Horarios de ejemplo, sujetos a la programación definitiva."],
    "Confirmar agendamento": ["Confirm booking","Confirmar reserva"],
    "Não desejo agendar": ["I do not want to book","No deseo reservar"],
    "Meu agendamento": ["My booking","Mi reserva"],
    "Nenhum agendamento confirmado.": ["No confirmed booking.","No hay reservas confirmadas."],
    "Adicionar ao Outlook": ["Add to Outlook","Añadir a Outlook"],
    "Cancelar agendamento": ["Cancel booking","Cancelar reserva"],
    "Como funciona": ["How it works","Cómo funciona"],
    "Os participantes da reunião de autocuidado terão prioridade por um período limitado. Depois, os horários restantes serão liberados aos demais colaboradores.": ["Participants in the self-care meeting will have priority for a limited period. Remaining times will then be opened to other employees.","Los participantes de la reunión de autocuidado tendrán prioridad durante un período limitado. Después, los horarios restantes estarán disponibles para los demás colaboradores."],
    "Agenda de atendimentos": ["Session schedule","Agenda de sesiones"],
    "Prévia da visão da Renata. Nenhum dado real disponível.": ["Preview of Renata’s view. No real data available.","Vista previa de Renata. No hay datos reales disponibles."],
    "A lista de reservas será exibida aqui após a integração. O acesso independente da Renata ainda não está habilitado.": ["The booking list will appear here after integration. Renata’s independent access is not yet enabled.","La lista de reservas aparecerá aquí después de la integración. El acceso independiente de Renata aún no está habilitado."],
    /* login */
    'Acesso restrito a colaboradores MCPack': ['Access restricted to MCPack employees', 'Acceso restringido a colaboradores MCPack'],
    'Acesse com suas credenciais corporativas.': ['Sign in with your corporate credentials.', 'Acceda con sus credenciales corporativas.'],
    'Entre com seu usuário e senha': ['Sign in with your username and password', 'Ingrese con su usuario y contraseña'],
    'Usuário ou e-mail': ['Username or e-mail', 'Usuario o correo electrónico'],
    'seu.usuario ou nome@mcpack.com.br': ['your.username or name@mcpack.com.br', 'su.usuario o nombre@mcpack.com.br'],
    'Senha': ['Password', 'Contraseña'],
    'Sua senha': ['Your password', 'Su contraseña'],
    'Mostrar senha': ['Show password', 'Mostrar contraseña'],
    'Ocultar senha': ['Hide password', 'Ocultar contraseña'],
    'Lembrar usuário': ['Remember username', 'Recordar usuario'],
    'Entrar': ['Sign in', 'Ingresar'],
    'Entrando...': ['Signing in...', 'Ingresando...'],
    'Preencha usuário e senha.': ['Enter your username and password.', 'Complete usuario y contraseña.'],
    'Usuário ou senha incorretos.': ['Incorrect username or password.', 'Usuario o contraseña incorrectos.'],
    'Erro de conexão.': ['Connection error.', 'Error de conexión.'],
    'Erro de conexão. Tente novamente.': ['Connection error. Please try again.', 'Error de conexión. Intente nuevamente.'],
    'Seus números,': ['Your numbers,', 'Sus números,'],
    'num só lugar.': ['in one place.', 'en un solo lugar.'],
    'Dashboards comerciais, financeiros e de projetos para acompanhamento estratégico do negócio.': ['Sales, financial and project dashboards for strategic business monitoring.', 'Dashboards comerciales, financieros y de proyectos para el seguimiento estratégico del negocio.'],
    'Bom dia': ['Good morning', 'Buenos días'],
    'Boa tarde': ['Good afternoon', 'Buenas tardes'],
    'Boa noite': ['Good evening', 'Buenas noches'],
    'Bem-vindo': ['Welcome', 'Bienvenido'],
    'Olá,': ['Hello,', 'Hola,'],
    'Para onde você quer ir?': ['Where do you want to go?', '¿A dónde quiere ir?'],
    'PORTAL BI': ['BI PORTAL', 'PORTAL BI'],
    'MCPack · Portal BI': ['MCPack · BI Portal', 'MCPack · Portal BI'],
    /* hub e menu */
    'Portal do Colaborador': ['Employee Portal', 'Portal del Colaborador'],
    'Holerites, documentos e dados cadastrais.': ['Payslips, documents and personal records.', 'Recibos de sueldo, documentos y datos de registro.'],
    'Dashboards': ['Dashboards', 'Dashboards'],
    'Indicadores comerciais, financeiros e de operação.': ['Sales, financial and operations indicators.', 'Indicadores comerciales, financieros y de operación.'],
    'Área do RH': ['HR Area', 'Área de RR. HH.'],
    'Cadastro de pessoas, documentos e consolidado.': ['People records, documents and consolidated view.', 'Registro de personas, documentos y consolidado.'],
    'Administração': ['Administration', 'Administración'],
    'Usuários, acessos e páginas liberadas.': ['Users, access and enabled pages.', 'Usuarios, accesos y páginas habilitadas.'],
    'Abrir →': ['Open →', 'Abrir →'],
    'Abrir menu': ['Open menu', 'Abrir menú'],
    'Menu principal': ['Main menu', 'Menú principal'],
    'Início': ['Home', 'Inicio'],
    'Sair': ['Sign out', 'Salir'],
    'Tema': ['Theme', 'Tema'],
    'Claro / Escuro': ['Light / Dark', 'Claro / Oscuro'],
    'Atalhos': ['Shortcuts', 'Atajos'],
    'Recolher / expandir o painel': ['Collapse / expand panel', 'Contraer / expandir el panel'],
    'Recolher ou expandir o painel': ['Collapse or expand the panel', 'Contraer o expandir el panel'],
    'Use Ctrl K para buscar qualquer painel': ['Press Ctrl K to search any panel', 'Use Ctrl K para buscar cualquier panel'],
    'Como usar o Portal': ['How to use the Portal', 'Cómo usar el Portal'],
    'Escolha a aba da sua área no topo da tela': ['Choose your area tab at the top of the screen', 'Elija la pestaña de su área en la parte superior de la pantalla'],
    'Painel': ['Panel', 'Panel'],
    'Portal': ['Portal', 'Portal'],
    'Sem acesso': ['No access', 'Sin acceso'],
    'sem acesso': ['no access', 'sin acceso'],
    'Carregando dashboard...': ['Loading dashboard...', 'Cargando dashboard...'],
    'Carregando páginas...': ['Loading pages...', 'Cargando páginas...'],
    'Carregando...': ['Loading...', 'Cargando...'],
    'Carregando…': ['Loading…', 'Cargando…'],
    'Erro ao carregar páginas.': ['Error loading pages.', 'Error al cargar las páginas.'],
    /* colaborador */
    'Meus documentos': ['My documents', 'Mis documentos'],
    'Meus dados': ['My data', 'Mis datos'],
    'Dados do cadastro da empresa, somente leitura. Para corrigir algo, fale com o RH. A foto você mesmo(a) pode trocar.': ['Company record data, read-only. To correct anything, talk to HR. You can change the photo yourself.', 'Datos del registro de la empresa, solo lectura. Para corregir algo, hable con RR. HH. La foto puede cambiarla usted mismo(a).'],
    'Seu cadastro ainda não foi encontrado.': ['Your record has not been found yet.', 'Su registro aún no fue encontrado.'],
    'Nenhum documento ainda.': ['No documents yet.', 'Aún no hay documentos.'],
    'Nenhum documento publicado ainda.': ['No documents published yet.', 'Aún no hay documentos publicados.'],
    'Você não tem permissão para ver os documentos desta pessoa.': ['You do not have permission to view this person\'s documents.', 'Usted no tiene permiso para ver los documentos de esta persona.'],
    'Nada encontrado.': ['Nothing found.', 'No se encontró nada.'],
    'Nenhum resultado para esta pesquisa ou filtro.': ['No results for this search or filter.', 'Sin resultados para esta búsqueda o filtro.'],
    'Holerite mensal': ['Monthly payslip', 'Recibo de sueldo mensual'],
    '13º salário': ['13th salary', 'Aguinaldo (13.º sueldo)'],
    'Adiantamento salarial': ['Salary advance', 'Adelanto de sueldo'],
    'Férias': ['Vacation', 'Vacaciones'],
    'Folha de ponto assinada': ['Signed timesheet', 'Hoja de asistencia firmada'],
    'Comprovantes': ['Receipts', 'Comprobantes'],
    'Empréstimo': ['Loan', 'Préstamo'],
    'Certificados': ['Certificates', 'Certificados'],
    'Avaliação': ['Evaluation', 'Evaluación'],
    'PDI': ['IDP', 'PDI'],
    'este tipo': ['this type', 'este tipo'],
    'Baixar PDF': ['Download PDF', 'Descargar PDF'],
    'Baixando': ['Downloading', 'Descargando'],
    'Baixando…': ['Downloading…', 'Descargando…'],
    'Não foi possível baixar.': ['Could not download.', 'No fue posible descargar.'],
    'Falha ao baixar um dos arquivos.': ['Failed to download one of the files.', 'Error al descargar uno de los archivos.'],
    'Sem permissão para baixar estes documentos.': ['No permission to download these documents.', 'Sin permiso para descargar estos documentos.'],
    'documento(s) não puderam ser baixados por falta de permissão.': ['document(s) could not be downloaded due to lack of permission.', 'documento(s) no pudieron descargarse por falta de permiso.'],
    'Selecionar documento': ['Select document', 'Seleccionar documento'],
    'Selecionar todos': ['Select all', 'Seleccionar todos'],
    'Selecionar todos os documentos da lista': ['Select all documents in the list', 'Seleccionar todos los documentos de la lista'],
    'Publicado em': ['Published on', 'Publicado el'],
    'Enviado em': ['Sent on', 'Enviado el'],
    /* tabela */
    'Pesquisar na tabela': ['Search table', 'Buscar en la tabla'],
    'Pesquisar em todas as colunas…': ['Search all columns…', 'Buscar en todas las columnas…'],
    'Pesquisar valores': ['Search values', 'Buscar valores'],
    'Pesquisar valores…': ['Search values…', 'Buscar valores…'],
    'Ordenar por': ['Sort by', 'Ordenar por'],
    'Filtrar': ['Filter', 'Filtrar'],
    'Filtrar por situação': ['Filter by status', 'Filtrar por situación'],
    'Limpar filtro': ['Clear filter', 'Borrar filtro'],
    'Aplicar': ['Apply', 'Aplicar'],
    'Todos': ['All', 'Todos'],
    'Todos os tipos': ['All types', 'Todos los tipos'],
    'Todas as competências': ['All periods', 'Todos los períodos'],
    'Exportar CSV': ['Export CSV', 'Exportar CSV'],
    /* pessoas / RH */
    'Pessoas': ['People', 'Personas'],
    'Pessoa': ['Person', 'Persona'],
    'Documentos': ['Documents', 'Documentos'],
    'Consolidado': ['Consolidated', 'Consolidado'],
    'Consolidado de documentos': ['Document summary', 'Consolidado de documentos'],
    'Matrícula': ['ID number', 'Matrícula'],
    'Nome': ['Name', 'Nombre'],
    'Departamento': ['Department', 'Departamento'],
    'Cargo': ['Job title', 'Cargo'],
    'Gestor': ['Manager', 'Gerente'],
    'Aniversário': ['Birthday', 'Cumpleaños'],
    'Aniversário (dd/mm)': ['Birthday (dd/mm)', 'Cumpleaños (dd/mm)'],
    'Admissão': ['Hire date', 'Ingreso'],
    'Nascimento': ['Date of birth', 'Fecha de nacimiento'],
    'Tempo de empresa': ['Time at company', 'Antigüedad en la empresa'],
    'Menos de 1 mês': ['Less than 1 month', 'Menos de 1 mes'],
    'Central de Artes': ['Artwork center', 'Centro de artes'],
    'Data de admissão': ['Hire date', 'Fecha de ingreso'],
    'Demissão': ['Termination', 'Desvinculación'],
    'Saída': ['Departure', 'Salida'],
    'Data de desligamento *': ['Termination date *', 'Fecha de desvinculación *'],
    'Informe a data de desligamento.': ['Enter the termination date.', 'Indique la fecha de desvinculación.'],
    'Motivo': ['Reason', 'Motivo'],
    '— sem motivo —': ['— no reason —', '— sin motivo —'],
    'Status': ['Status', 'Estado'],
    'Situação': ['Status', 'Situación'],
    'Situação do funcionário': ['Employee status', 'Situación del empleado'],
    'Ativo': ['Active', 'Activo'],
    'Ativos': ['Active', 'Activos'],
    'Inativo': ['Inactive', 'Inactivo'],
    'Inativos': ['Inactive', 'Inactivos'],
    'Funcionário ativo': ['Active employee', 'Empleado activo'],
    'Funcionário inativo': ['Inactive employee', 'Empleado inactivo'],
    'Telefone': ['Phone', 'Teléfono'],
    'Telefone de trabalho': ['Work phone', 'Teléfono de trabajo'],
    'Celular': ['Mobile', 'Celular'],
    'E-mail corporativo': ['Corporate e-mail', 'Correo corporativo'],
    'Editar': ['Edit', 'Editar'],
    'Editar dados': ['Edit data', 'Editar datos'],
    'Salvar': ['Save', 'Guardar'],
    'Salvando...': ['Saving...', 'Guardando...'],
    'Salvando…': ['Saving…', 'Guardando…'],
    'Cancelar': ['Cancel', 'Cancelar'],
    'Voltar': ['Back', 'Volver'],
    '← Voltar para Pessoas': ['← Back to People', '← Volver a Personas'],
    'Ver': ['View', 'Ver'],
    'Clique em uma pessoa para abrir o cadastro dela. Somente leitura por enquanto, exceto a foto.': ['Click a person to open their record. Read-only for now, except the photo.', 'Haga clic en una persona para abrir su registro. Solo lectura por ahora, excepto la foto.'],
    'E-mail, telefone, celular, cargo e matrícula são gravados no Odoo. Aniversário e admissão ficam só no portal. Departamento e gestor ainda se alteram no Odoo.': ['E-mail, phone, mobile, job title and ID number are saved in Odoo. Birthday and hire date stay only in the portal. Department and manager are still changed in Odoo.', 'Correo, teléfono, celular, cargo y matrícula se guardan en Odoo. Cumpleaños e ingreso quedan solo en el portal. Departamento y gerente aún se modifican en Odoo.'],
    'Ao salvar, o funcionário é arquivado no Odoo e o acesso ao portal é cortado. Histórico e documentos são mantidos.': ['On saving, the employee is archived in Odoo and portal access is cut off. History and documents are kept.', 'Al guardar, el empleado se archiva en Odoo y se corta el acceso al portal. Se conservan el historial y los documentos.'],
    'Foto atualizada no portal e no Odoo.': ['Photo updated in the portal and in Odoo.', 'Foto actualizada en el portal y en Odoo.'],
    'Foto atualizada no portal. Não foi possível gravar no Odoo agora (': ['Photo updated in the portal. Could not save to Odoo right now (', 'Foto actualizada en el portal. No fue posible guardar en Odoo ahora ('],
    'Escolha um arquivo de imagem (JPG ou PNG).': ['Choose an image file (JPG or PNG).', 'Elija un archivo de imagen (JPG o PNG).'],
    'Não foi possível ler esta imagem. Use JPG ou PNG.': ['Could not read this image. Use JPG or PNG.', 'No fue posible leer esta imagen. Use JPG o PNG.'],
    /* importação de recibos */
    'Importar PDF de recibos': ['Import payslip PDF', 'Importar PDF de recibos'],
    'Envie o PDF com todos os colaboradores. O portal separa uma página por pessoa, lê a matrícula e abre uma tela de conferência. Nada fica visível para o colaborador antes de você publicar.': ['Upload the PDF with all employees. The portal splits one page per person, reads the ID number and opens a review screen. Nothing is visible to the employee before you publish.', 'Suba el PDF con todos los colaboradores. El portal separa una página por persona, lee la matrícula y abre una pantalla de revisión. Nada es visible para el colaborador antes de que usted publique.'],
    'Arquivo PDF': ['PDF file', 'Archivo PDF'],
    'Arquivo': ['File', 'Archivo'],
    'Competência': ['Period', 'Período'],
    'Competência no formato AAAA-MM, por exemplo 2026-11.': ['Period in YYYY-MM format, for example 2026-11.', 'Período en formato AAAA-MM, por ejemplo 2026-11.'],
    'Automático (pelo cabeçalho do recibo)': ['Automatic (from the payslip header)', 'Automático (por el encabezado del recibo)'],
    'Detectar pelo recibo': ['Detect from payslip', 'Detectar por el recibo'],
    'Ler e enviar': ['Read and upload', 'Leer y enviar'],
    'Lendo página': ['Reading page', 'Leyendo página'],
    'Lotes recentes': ['Recent batches', 'Lotes recientes'],
    'Nenhum lote ainda.': ['No batches yet.', 'Aún no hay lotes.'],
    'Conferência do lote': ['Batch review', 'Revisión del lote'],
    'Conferir': ['Review', 'Revisar'],
    'Em conferência': ['In review', 'En revisión'],
    'Publicar': ['Publish', 'Publicar'],
    'Publicado': ['Published', 'Publicado'],
    'Rascunho': ['Draft', 'Borrador'],
    'Cancelado': ['Canceled', 'Cancelado'],
    'Lido no PDF': ['Read from PDF', 'Leído del PDF'],
    'O nome lido no PDF é diferente do cadastro': ['The name read from the PDF differs from the record', 'El nombre leído en el PDF es distinto del registro'],
    'Sugestão pelo nome:': ['Suggestion by name:', 'Sugerencia por nombre:'],
    'Escolher pessoa…': ['Choose person…', 'Elegir persona…'],
    'Escolha a pessoa.': ['Choose the person.', 'Elija la persona.'],
    'Escolha o arquivo PDF.': ['Choose the PDF file.', 'Elija el archivo PDF.'],
    'Cancelar o lote? Os rascunhos serão descartados.': ['Cancel the batch? Drafts will be discarded.', '¿Cancelar el lote? Los borradores se descartarán.'],
    'Remover este recibo do lote?': ['Remove this payslip from the batch?', '¿Quitar este recibo del lote?'],
    'Carregando leitor de PDF…': ['Loading PDF reader…', 'Cargando lector de PDF…'],
    'Não foi possível carregar uma biblioteca de leitura de PDF.': ['Could not load a PDF reading library.', 'No fue posible cargar una biblioteca de lectura de PDF.'],
    'páginas sem competência: preencha o campo Competência e envie de novo.': ['pages without a period: fill in the Period field and upload again.', 'páginas sin período: complete el campo Período y envíe de nuevo.'],
    'páginas sem recibo foram ignoradas.': ['pages without a payslip were ignored.', 'páginas sin recibo fueron ignoradas.'],
    'já existiam e foram ignorados.': ['already existed and were ignored.', 'ya existían y fueron ignorados.'],
    'sem vínculo continuam como rascunho.': ['unlinked remain as drafts.', 'sin vínculo continúan como borrador.'],
    'recibos? Cada colaborador passa a ver o seu em Meus documentos.': ['payslips? Each employee will see theirs in My documents.', '¿recibos? Cada colaborador pasa a ver el suyo en Mis documentos.'],
    'NOVO': ['NEW', 'NUEVO'], 'Novo': ['New', 'Nuevo'],
    'NÃO VISTO': ['NOT SEEN', 'NO VISTO'], 'Visto': ['Seen', 'Visto'],
    'NOME DIFERENTE': ['DIFFERENT NAME', 'NOMBRE DISTINTO'],
    'Sem vínculo': ['Unlinked', 'Sin vínculo'], 'sem vínculo': ['unlinked', 'sin vínculo'], 'sem vinculo': ['unlinked', 'sin vínculo'],
    '(sem vínculo)': ['(unlinked)', '(sin vínculo)'],
    'sem matrícula': ['no ID number', 'sin matrícula'],
    '· inativo': ['· inactive', '· inactivo'], '· não visto': ['· not seen', '· no visto'],
    'Origem': ['Source', 'Origen'], 'Tipo': ['Type', 'Tipo'], 'Pessoa': ['Person', 'Persona'],
    /* admin */
    'Usuários e acessos': ['Users and access', 'Usuarios y accesos'],
    'Usuários cadastrados': ['Registered users', 'Usuarios registrados'],
    'Usuário': ['User', 'Usuario'],
    'Páginas liberadas': ['Enabled pages', 'Páginas habilitadas'],
    'Ações': ['Actions', 'Acciones'], 'Ação': ['Action', 'Acción'],
    '+ Novo usuário': ['+ New user', '+ Nuevo usuario'],
    'Novo usuário': ['New user', 'Nuevo usuario'],
    'Editar usuário': ['Edit user', 'Editar usuario'],
    'Ativar ou desativar usuário': ['Enable or disable user', 'Activar o desactivar usuario'],
    'E-mail (será o usuário de acesso)': ['E-mail (will be the login username)', 'Correo (será el usuario de acceso)'],
    'Para novos usuários, use o e-mail corporativo, por exemplo nome@mcpack.com.br.': ['For new users, use the corporate e-mail, for example name@mcpack.com.br.', 'Para nuevos usuarios, use el correo corporativo, por ejemplo nombre@mcpack.com.br.'],
    'Senha (deixe em branco para não alterar)': ['Password (leave blank to keep unchanged)', 'Contraseña (deje en blanco para no cambiarla)'],
    'nova senha': ['new password', 'nueva contraseña'],
    'Preencha o usuário!': ['Enter the username!', '¡Complete el usuario!'],
    'Preencha o e-mail do usuário!': ['Enter the user e-mail!', '¡Complete el correo del usuario!'],
    'Preencha a senha para novo usuário!': ['Enter the password for the new user!', '¡Complete la contraseña del nuevo usuario!'],
    'Administrador': ['Administrator', 'Administrador'], 'Admin': ['Admin', 'Admin'],
    'Colaborador': ['Employee', 'Colaborador'], 'Colab.': ['Emp.', 'Colab.'], 'Dashb.': ['Dash.', 'Dash.'], 'Docs': ['Docs', 'Docs'],
    'Acesso ao portal': ['Portal access', 'Acceso al portal'],
    'Erro': ['Error', 'Error'], 'Erro:': ['Error:', 'Error:'], 'Editar:': ['Edit:', 'Editar:'],
    /* meses */
    'Janeiro': ['January', 'Enero'], 'Fevereiro': ['February', 'Febrero'], 'Março': ['March', 'Marzo'], 'Abril': ['April', 'Abril'],
    'Maio': ['May', 'Mayo'], 'Junho': ['June', 'Junio'], 'Julho': ['July', 'Julio'], 'Agosto': ['August', 'Agosto'],
    'Setembro': ['September', 'Septiembre'], 'Outubro': ['October', 'Octubre'], 'Novembro': ['November', 'Noviembre'], 'Dezembro': ['December', 'Diciembre'],
    'Idioma (PT / EN / ES)': ['Language (PT / EN / ES)', 'Idioma (PT / EN / ES)']
  };

  /* Padrões com número ou nome no meio. $n = trecho capturado */
  var PATS = [
    [/^Baixar selecionados \((\d+)\)$/, 'Download selected ($1)', 'Descargar seleccionados ($1)'],
    [/^Baixar todos \((\d+)\)$/, 'Download all ($1)', 'Descargar todos ($1)'],
    [/^Nenhum documento de (.+) ainda\.$/, 'No @1 documents yet.', 'Aún no hay documentos de @1.'],
    [/^Lendo página (\d+) de (\d+)… \((\d+) enviadas\)$/, 'Reading page $1 of $2… ($3 uploaded)', 'Leyendo página $1 de $2… ($3 enviadas)'],
    [/^(\d+) recibos lidos \((\d+) vinculados pela matrícula\)\.$/, '$1 payslips read ($2 linked by ID number).', '$1 recibos leídos ($2 vinculados por matrícula).'],
    [/^Olá, (.+)$/, 'Hello, $1', 'Hola, $1'],
    [/^Editar: (.+)$/, 'Edit: $1', 'Editar: $1'],
    [/^Erro: (.+)$/, 'Error: $1', 'Error: $1'],
    [/^Remover o usuário "(.+)"\?$/, 'Remove user "$1"?', '¿Quitar al usuario "$1"?'],
    [/^(\d+) ativos · (.+)$/, '$1 active · $2', '$1 activos · $2'],
    [/^(\d+) recibos · (.+)$/, '$1 payslips · $2', '$1 recibos · $2'],
    [/^(\d+) prontos para publicar · (.+)$/, '$1 ready to publish · $2', '$1 listos para publicar · $2']
  ];

  /* $n = trecho capturado; @n = trecho capturado também traduzido */
  function fill(t, m) { return t.replace(/[$@](\d)/g, function (x, d) { var v = m[Number(d)]; return v === undefined ? '' : (x.charAt(0) === '@' ? core(v) : v); }); }
  function core(c) {
    var i = LANG === 'en' ? 0 : 1;
    if (Object.prototype.hasOwnProperty.call(DICT, c)) return DICT[c][i];
    var k, j = LANG === 'en' ? 1 : 2;
    for (k = 0; k < PATS.length; k++) { var mm = PATS[k][0].exec(c); if (mm) return fill(PATS[k][j], mm); }
    var p, m;
    if (c.indexOf(' · ') > 0) { p = c.split(' · '); m = p.map(core); if (m.join('\u0001') !== p.join('\u0001')) return m.join(' · '); }
    var x = c.indexOf(': ');
    if (x > 0) { var a = c.slice(0, x), b = c.slice(x + 2), ta = core(a), tb = core(b); if (ta !== a || tb !== b) return ta + ': ' + tb; }
    return c;
  }
  function tr(s) {
    if (LANG === 'pt' || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (!m[2]) return s;
    var o = core(m[2]);
    return o === m[2] ? s : m[1] + o + m[3];
  }
  window.trPortal = tr;

  /* guarda o texto original de cada nó para poder voltar ao português */
  var orig = new WeakMap();
  var ATTR = ['placeholder', 'aria-label', 'title', 'alt'];
  var SKIP = /^(TEXTAREA|SCRIPT|STYLE|PRE|CODE)$/;
  function origOf(map, key, cur) { var o = map.get(key); if (o === undefined) { map.set(key, cur); return cur; } return o; }
  var lastApplied = new WeakMap();

  function trText(n) {
    var p = n.parentNode;
    if (p && SKIP.test(p.nodeName)) return;
    var cur = n.nodeValue, prev = lastApplied.get(n);
    var base = (prev !== undefined && cur === prev) ? orig.get(n) : cur;   /* texto mudou por fora: novo original */
    orig.set(n, base);
    var out = LANG === 'pt' ? base : tr(base);
    if (out !== cur) { n.nodeValue = out; }
    lastApplied.set(n, out);
  }
  var attrOrig = new WeakMap();
  function trAttrs(el) {
    if (!el.getAttribute) return;
    ATTR.forEach(function (a) {
      var v = el.getAttribute(a); if (v === null) return;
      var rec = attrOrig.get(el) || {}; var r = rec[a];
      var base = (r && v === r.out) ? r.base : v;
      var out = LANG === 'pt' ? base : tr(base);
      rec[a] = { base: base, out: out }; attrOrig.set(el, rec);
      if (out !== v) el.setAttribute(a, out);
    });
  }
  function walk(root) {
    if (root.nodeType === 3) { trText(root); return; }
    if (root.nodeType !== 1) return;
    if (SKIP.test(root.nodeName)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), t, list = [];
    while ((t = w.nextNode())) list.push(t);
    list.forEach(trText);
    trAttrs(root);
    root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(trAttrs);
  }

  var busy = false;
  var obs = new MutationObserver(function (ms) {
    if (busy) return;
    busy = true;
    try {
      ms.forEach(function (m) {
        if (m.target && m.target.closest && m.target.closest('[data-lang-btn]')) return;
        if (m.type === 'childList') m.addedNodes.forEach(walk);
        else if (m.type === 'characterData') trText(m.target);
        else if (m.type === 'attributes') trAttrs(m.target);
      });
      obs.takeRecords();
    } finally { busy = false; }
  });

  function applyAll() {
    busy = true;
    try { walk(document.body); document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : LANG; obs.takeRecords(); } finally { busy = false; }
  }

  /* alert e confirm também passam pela tradução */
  var _alert = window.alert, _confirm = window.confirm;
  window.alert = function (m) { return _alert.call(window, tr(String(m))); };
  window.confirm = function (m) { return _confirm.call(window, tr(String(m))); };

  var LABEL = { pt: 'Português', en: 'English', es: 'Español' };
  function paintAll() {
    var t = 'Idioma / Language / Idioma: ' + LABEL[LANG];
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var c = b.querySelector('.lang-cur'); if (c) c.textContent = LANG.toUpperCase();
      b.setAttribute('aria-label', t); b.title = t;
    });
  }
  function setLang(l) {
    LANG = l; try { localStorage.setItem(KEY, l); } catch (e) {}
    paintAll();
    applyAll();
  }

  /* os botões [data-lang-btn] ficam no login e no trilho do menu (junto do Tema) */
  function start() {
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('[data-lang-btn]');
      if (b) setLang(LANGS[(LANGS.indexOf(LANG) + 1) % LANGS.length]);
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
    paintAll();
    applyAll();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
