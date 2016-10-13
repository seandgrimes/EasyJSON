import {Token} from "./Lexer";
import {TokenType} from "./Lexer";

enum SymbolType {
    Comment,
    Date,
    Document,
    EqualSign,
    Identifier,
    Number,
    String,
    Tab,
    Type,
    Unknown
}

interface IVisitor {
    visitComment(comment : Comment) : void;
    visitDocument(document : Document) : void; 
    visitEqualSign(equalSign: EqualSign) : void;
    visitIdentifier(identifier : Identifier) : void;
    visitType(type : Type) : void;  
}

interface ISymbol {
    /** The line number within the source file where the symbol appears */
    lineNumber : number;

    /** The parent symbol that this symbol belongs to */
    parent : ISymbol;

    /** The starting position within the line where the symbol appears */
    position : number;

    /** The type of the symbol */
    symbolType: SymbolType;

    /** The source text associated with the symbol */
    text: string;

    /** Method for implementing the visitor pattern */
    visit(visitor : IVisitor) : void;
}

abstract class Symbol implements ISymbol {
    public lineNumber : number;
    public parent : ISymbol;
    public position : number;
    public symbolType : SymbolType;
    public text : string;

    constructor(lineNumber : number, parent : ISymbol, position : number, symbolType : SymbolType, text : string) {
        this.lineNumber = lineNumber;
        this.parent = parent;
        this.position = position;
        this.symbolType = symbolType;
        this.text = text;
    }

    abstract visit(visitor : IVisitor) : void;
}

class Comment extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.Comment, text);        
    }

    public visit(visitor : IVisitor) {
        visitor.visitComment(this);
    }
}

class Document extends Symbol {
    /** Ordered list of all the child symbols that belong to the document (comments, identifiers, etc.) */
    public children : ISymbol[];

    public constructor(text: string) {
        super(0, null, 0, SymbolType.Document, text);        
    }

    public visit(visitor : IVisitor) {
        visitor.visitDocument(this);
    }
}

class EqualSign extends Symbol {
    public leftHandSide : ISymbol;
    public rightHandSide : ISymbol;

    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.EqualSign, text);        
    }

    public visit(visitor : IVisitor) {
        visitor.visitEqualSign(this);
    }
}

class DateSymbol extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.Date, text);        
    }

    public visit(visitor : IVisitor) {
        // To do
    }
}

class NumberSymbol extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.Number, text);        
    }

    public visit(visitor : IVisitor) {
        // To do
    }
}

class StringSymbol extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.Number, text);        
    }

    public visit(visitor : IVisitor) {
        // To do
    }
}

class TabSymbol extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.Number, text);        
    }

    public visit(visitor : IVisitor) {
        // To do
    }
}

class Type extends Symbol {
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.EqualSign, text);        
    }

    public visit(visitor : IVisitor) {
        visitor.visitIdentifier(this);
    }
}

class Identifier extends Symbol {
       
    public constructor(lineNumber : number, parent : ISymbol, position : number, text : string) {
        super(lineNumber, parent, position, SymbolType.EqualSign, text);        
    }

    public visit(visitor : IVisitor) {
        visitor.visitIdentifier(this);
    }
}

class TokenToSymbolMapper {
    public map(token : Token) : ISymbol {
        let lookupMap = {};
        
        lookupMap[TokenType.Comment] = this.mapComment;
        lookupMap[TokenType.Date] = this.mapDate;
        lookupMap[TokenType.EqualSign] = this.mapEqualSign; 
        lookupMap[TokenType.Identifier] =  this.mapIdentifier;
        lookupMap[TokenType.Number] = this.mapNumber;
        lookupMap[TokenType.String] = this.mapString;
        lookupMap[TokenType.Tab] = this.mapTab;
        lookupMap[TokenType.Type] = this.mapType;

        let mapper = lookupMap[token.tokenType];
        if (mapper) return mapper(token);   
    }

    private mapComment(token : Token) : Comment {
        return new Comment(
            token.lineNumber, 
            null, 
            token.position, 
            token.value);
    }

    private mapDate(token : Token) : DateSymbol {
        return new DateSymbol(
            token.lineNumber,
            null,
            token.position,
            token.value);
    }

    private mapEqualSign(token : Token) : EqualSign {
        return new EqualSign(
            token.lineNumber,
            null,
            token.position,
            token.value);
    }

    private mapIdentifier(token : Token) : Identifier {
        return new Identifier(
            token.lineNumber,
            null,
            token.position,
            token.value);        
    }

    private mapNumber(token : Token) : NumberSymbol {
        return new NumberSymbol(
            token.lineNumber,
            null,
            token.position,
            token.value); 
    }

    private mapString(token : Token) : StringSymbol {
        return new StringSymbol(
            token.lineNumber,
            null,
            token.position,
            token.value); 
    }

    private mapTab(token : Token) : TabSymbol {
        return new TabSymbol(
            token.lineNumber,
            null,
            token.position,
            token.value);
    }

    private mapType(token : Token) : Type {
        return new Type(
            token.lineNumber,
            null,
            token.position,
            token.value);
    }
}

class Node<TValue> {
    public previous : Node<TValue>;
    public next : Node<TValue>;
    public value: TValue;
}

class LinkedList<TValue> {
    public head : Node<TValue>;
    public tail : Node<TValue>;

    public insertBefore(node : Node<TValue>, target : Node<TValue>) {
        if (target === this.head) {
            
        }
    }
}

export class Parser {
    private document : Document;
    private tokens : Token[] = [];

    public constructor(tokens : Token[], programText : string) {
        this.tokens = tokens;
        this.document = new Document(programText);
    }

    public parse() : Document {
        let document = this.document;
        let mapper = new TokenToSymbolMapper();

        // First round of parsing, convert all tokens to symbols
        let symbols = this.tokens.map(token => mapper.map(token));

        return null;
    }
}