import { LitElement, html, css } from 'lit';
import {pokemon} from './pokemon.js';
import './card-poke.js';

export class PrincipalComponente extends LitElement {
    
    static styles = [
        css`
         /*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');*/

          .container{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            background: url('./img/R.jfif');
            border: 3px solid #005B41;
            gap: 10px;
            height: 100%;
            padding: 10px;
          }

          label{
            margin: 10px;
          }

          .filter{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0px 0px 50px 0px;
            font-size: 1.5rem;
            //font-family: roboto, 'poppins', sans-serif;
          }

          #filter-button{
            background-color: blue;
            color: white;
            width: 70px;
            height: 30px;
            border-radius: 10px;
            padding: 5px;
            border: 2px solid unset;
          }

          #filter-button:hover{
            background-color: green;
            color: white;
          }

          #pokemon-type{

          }

          #pokemon-rarity{

          }

          #select-poke-type{
            font-size: 1rem;
          }

          #select-poke-rarity{
            font-size: 1rem;
          }

          #input-poke-name{
            font-size: 1rem;
          }

          #pokemon-name{

          }

          #filter-title{
            font-size: 2rem;
          }

          #error-message{
            font-size: 4rem;
            color: red;
          }

        `
    ];

    get _selectRarity() {
        return (this.___selectRarity ??= this.renderRoot?.getElementById('select-poke-rarity') ?? null);
    }
    
    get _selectType() {
        return (this.___selectType ??= this.renderRoot?.getElementById('select-poke-type') ?? null);
    }

    get _selectName() {
        return (this.___selectName ??= this.renderRoot?.getElementById('input-poke-name') ?? null);
    }

    static get properties() {
        return {
            pokemones: {type: Object},
            fillRarityPoke: {type: Array},
            typePoke: {type: Array},
            namePoke: {type: String},
            filteredPokemon: {type: String},
            banderaName: {type: String},
            opRarity: {type: String},
            opName: {type: String},
            opType: {type: String},
        }
    }

    constructor(){
        super();
        this.pokemones = pokemon.pokemon;
        //console.log(this.pokemones);
        this.fillRarityPoke = [];
        this.typePoke = [];
        //console.log(this.typePoke);
        this.namePoke = "";
        this.filteredPokemon = [];
        console.log(this.filteredPokemon);
        this.banderaName = false;
        this.opRarity = "";
        this.opName = "";
        this.opType = "";

    }

    /*
    connectedCallback(){
        super.connectedCallback();
        window.addEventListener('click', this.filterPoke);
    }*/

    render() {
        return html`

            <div class="filter">
                <p id="filter-title">SELECIONA UNA FORMA DE FILTRADO</p>
                
                <div class="filter-options">
                    <label id="pokemon-rarity">Tipo de rareza:
                        <select id="select-poke-rarity" @click=${this.selectRarity}>
                            <option>Seleciona</option>
                            ${this.fillSelectRarity()}
                            ${this.fillRarityPoke.map((item)=>
                                html`<option>${item}</option>`
                            )}
                        </select>

                    </label>

                    <label id="pokemon-type">Tipo de pokemon:
                        <select id="select-poke-type" @click=${this.selectType}>
                            <option>Seleciona</option>
                           ${this.fillSelectTypePoke()}
                           ${this.typePoke.map(
                            (tipo)=>
                            html`<option>${tipo}</option>`
                           )}
                        </select>

                    </label>

                    <label id="pokemon-name">Nombre: <input @input=${this.captureName} id="input-poke-name" type="text" placeholder="ej.: Pikachu"/></label>
                    <button id="filter-button" @click=${this.selectName}>Buscar</button>
                </div>
                <p>${this.namePoke}</p>
            </div>

            <div class="container">
                            
                ${this.pintarPokemones()}

            </div>
        `;
    }

    pintarPokemones(){
        if(this.filteredPokemon.length>0){
            return this.filteredPokemon.map(
                (item)=> html`<card-poke .pokemon=${item}><card-poke>`
            )
        }else{
            return this.pokemones.map(
                (item)=> html`<card-poke .pokemon=${item}><card-poke>`
            )
        }
    }

    selectRarity(){
        this.filteredPokemon = [];

        const opRarity = this._selectRarity.options[this._selectRarity.selectedIndex];
        if(opRarity){
            this.opRarity = opRarity.value;
        }
        //Revisar...
        console.log(this.opRarity);

        this.pokemones.filter(
            (rareza)=> {
                if(rareza['pokemon-rarity']===this.opRarity){
                    
                    if(!this.filteredPokemon.includes(rareza)){
                        this.filteredPokemon.push(rareza);
                    }
                }
            }
        );

        console.log(this.filteredPokemon);
        this._selectRarity.options[this._selectRarity.selectedIndex= 0];

    }

    selectType(){
        this.filteredPokemon = [];

        const opType = this._selectType.options[this._selectType.selectedIndex];
        if(opType){
            this.opType = opType.value;
        }
        //Revisar...
        console.log(this.opType);

        this.pokemones.forEach(
            (existente)=>{
                existente.type.forEach(
                (item) =>{
                        if(item === this.opType){
                            if(!this.filteredPokemon.includes(existente)){
                                this.filteredPokemon.push(existente);
                            }
                        }
                }
            )}
        );

        console.log(this.filteredPokemon);
        this._selectType.options[this._selectType.selectedIndex= 0];
    }

    /*
        filtrado sencillo, carga de datos normal.
        ${this.pokemones.map(
            (poke)=> html`<card-poke .pokemon=${poke}></card-poke>`
        )}

        filtrado por nombre
        ${this.pintarPoke()}
             ${this.banderaName === true ? this.filteredPokemon.map(
                (element)=> html`<card-poke .pokemon=${element}></card-poke>`
                    ) : html`<p id="error-message">No existen coincidencias</p>`
        }
    
    */

    selectName(e){
    
        this.filteredPokemon = [];

        const opName = this._selectName.value;
        if(opName){
            this.opName = opName;
        }

        console.log(this.opName);

        this.pokemones.filter(
            (rareza)=> {
                if(rareza.name === this.opName){
                    
                    if(!this.filteredPokemon.includes(rareza)){
                        this.filteredPokemon.push(rareza);
                    }
                }
            }
        );

        console.log(this.filteredPokemon);
        this._selectName.value = '';

    }

    /*
    pintarPoke(){
        if(this.filteredPokemon.length>0){
            this.banderaName = true;
        }
    }
    */


    fillSelectRarity(){
        this.pokemones.forEach((existente)=>{
            if(!this.fillRarityPoke.includes(existente['pokemon-rarity'])){
                this.fillRarityPoke.push(existente['pokemon-rarity']);
            }
        })
    }

    fillSelectTypePoke(){
        this.pokemones.forEach(
            (existente)=>{
                existente.type.map(
                (tipo)=>{
                    
                    if(!this.typePoke.includes(tipo)){
                        this.typePoke.push(tipo);
                    }
                }
            )}
            
        )
    }

}


customElements.define('principal-componente', PrincipalComponente);
