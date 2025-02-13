import { Empresa } from './empresa.model';
import { Analista } from './analista.model';
import { TipoChamado } from './tipo-chamado.model';
import { SubtipoChamado } from './subtipo-chamado.model';
import { User } from './user.model';

export interface Chamados {
    idChamado: number,
    idEmpresa: Empresa,
    idAnalista: Analista,
    idUsuario: User,
    dataAbertura: string,
    horaAbertura: string,
    dataFechamento: string,
    horaFechamento: string,
    tempoChamado: string,
    codigoStatusChamado: number,
    tipoChamado: TipoChamado,
    subtipoChamado: SubtipoChamado,
    descricaoChamado: string,
    solucaoChamado: string,
}