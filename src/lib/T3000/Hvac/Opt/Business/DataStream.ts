
export type StructReadFn = (ds: DataStream, struct: object) => any;
export interface StructReadArray extends Array<StructRead> { }
export type LenFn = (struct: object, ds: DataStream, def: StructRead) => any;
export type TypedArray = | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export interface StructWriteArray extends Array<StructWrite> { }

export type StructRead =
  | string
  | StructReadFn
  | { get: StructReadFn }
  | ["[]", string, string | LenFn]
  | StructReadArray;

export type StructWriteFn = (
  ds: DataStream,
  field: string,
  struct: object
) => void;

export type StructWrite =
  | string
  | StructWriteFn
  | { set: StructWriteFn }
  | StructWriteArray;

class DataStream {

  private _dynamicSize = true;
  private _byteLength = 0;
  private _byteOffset: number;
  private _buffer: ArrayBuffer;
  private _dataView: DataView;

  public position: any;
  static readonly endianness: boolean = new Int8Array(
    new Int16Array([1]).buffer
  )[0] > 0;

  static readonly BIG_ENDIAN = false;
  static readonly LITTLE_ENDIAN = true;

  public failurePosition = 0;

  // constructor(e, t, n) {
  //   this.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0;

  //   this._byteOffset = t || 0,
  //     e instanceof ArrayBuffer ? this.buffer = e : "object" == typeof e ? (this.dataView = e,
  //       t && (this._byteOffset += t)) : this.buffer = new ArrayBuffer(e || 0),
  //     this.position = 0,
  //     this.endianness = null == n ? DataStream.LITTLE_ENDIAN : n
  // }

  constructor(
    arrayBuffer?:
      | ArrayBuffer
      | { buffer: ArrayBuffer; byteOffset: number; byteLength: number },
    byteOffset?: number,
    public endianness: boolean = DataStream.LITTLE_ENDIAN
  ) {
    this.position = 0;
    this._byteOffset = byteOffset || 0;
    if (arrayBuffer instanceof ArrayBuffer) {
      this.buffer = arrayBuffer;
    } else if (typeof arrayBuffer === "object") {
      this.dataView = arrayBuffer as any;
      if (byteOffset) {
        this._byteOffset += byteOffset;
      }
    } else {
      this.buffer = new ArrayBuffer(arrayBuffer || 1);
    }
  }

  /*
  DataStream = function (e, t, n) {
    this._byteOffset = t || 0,
      e instanceof ArrayBuffer ? this.buffer = e : "object" == typeof e ? (this.dataView = e,
        t && (this._byteOffset += t)) : this.buffer = new ArrayBuffer(e || 0),
      this.position = 0,
      this.endianness = null == n ? DataStream.LITTLE_ENDIAN : n
  }
  */

  save = function (e) {
    var t = new Blob(this.buffer)
      , n = window.webkitURL || window.URL;
    if (!n || !n.createObjectURL)
      throw "DataStream.save: Can't create object URL.";
    var i = n.createObjectURL(t)
      , o = document.createElement("a");
    o.setAttribute("href", i),
      o.setAttribute("download", e),
      o.click(),
      n.revokeObjectURL(i)
  }

  /*
  Object.defineProperty(DataStream.prototype, "dynamicSize", {
    get: function () {
      return this._dynamicSize
    },
      set: function (e) {
        e || this._trimAlloc(),
          this._dynamicSize = e
      }
  })
  */

  get dynamicSize(): boolean {
    return this._dynamicSize;
  }

  set dynamicSize(v: boolean) {
    if (!v) {
      this._trimAlloc();
    }
    this._dynamicSize = v;
  }

  /*
  // Object.defineProperty(DataStream.prototype, "byteLength", {
  //   get: function () {
  //     return this._byteLength - this._byteOffset
  //   }
  // })
  */

  get byteLength(): number {
    return this._byteLength - this._byteOffset;
  }

  /*
  // Object.defineProperty(DataStream.prototype, "buffer", {
  //   get: function () {
  //     return this._trimAlloc(),
  //       this._buffer
  //   },
  //   set: function (e) {
  //     this._buffer = e,
  //       this._dataView = new DataView(this._buffer, this._byteOffset),
  //       this._byteLength = this._buffer.byteLength
  //   }
  // })
  */

  get buffer(): ArrayBuffer {
    this._trimAlloc();
    return this._buffer;
  }

  set buffer(v: ArrayBuffer) {
    this._buffer = v;
    this._dataView = new DataView(this._buffer, this._byteOffset);
    this._byteLength = this._buffer.byteLength;
  }

  /*
  // Object.defineProperty(DataStream.prototype, "byteOffset", {
  //   get: function () {
  //     return this._byteOffset
  //   },
  //   set: function (e) {
  //     this._byteOffset = e,
  //       this._dataView = new DataView(this._buffer, this._byteOffset),
  //       this._byteLength = this._buffer.byteLength
  //   }
  // })
  */

  get byteOffset(): number {
    return this._byteOffset;
  }

  set byteOffset(v: number) {
    this._byteOffset = v;
    this._dataView = new DataView(this._buffer, this._byteOffset);
    this._byteLength = this._buffer.byteLength;
  }

  /*
  // Object.defineProperty(DataStream.prototype, "dataView", {
  //   get: function () {
  //     return this._dataView
  //   },
  //   set: function (e) {
  //     this._byteOffset = e.byteOffset,
  //       this._buffer = e.buffer,
  //       this._dataView = new DataView(this._buffer, this._byteOffset),
  //       this._byteLength = this._byteOffset + e.byteLength
  //   }
  // })
  */

  get dataView(): DataView {
    return this._dataView;
  }

  set dataView(v: DataView) {
    this._byteOffset = v.byteOffset;
    this._buffer = v.buffer;
    this._dataView = new DataView(this._buffer, this._byteOffset);
    this._byteLength = this._byteOffset + v.byteLength;
  }

  bigEndian(): DataStream {
    this.endianness = DataStream.BIG_ENDIAN;
    return this;
  }

  private _realloc(extra: number) {
    if (!this._dynamicSize) {
      return;
    }
    const req = this._byteOffset + this.position + extra;
    let blen = this._buffer.byteLength;
    if (req <= blen) {
      if (req > this._byteLength) {
        this._byteLength = req;
      }
      return;
    }
    if (blen < 1) {
      blen = 1;
    }
    while (req > blen) {
      blen *= 2;
    }
    const buf = new ArrayBuffer(blen);
    const src = new Uint8Array(this._buffer);
    const dst = new Uint8Array(buf, 0, src.length);
    dst.set(src);
    this.buffer = buf;
    this._byteLength = req;
  }

  private _trimAlloc(): void {
    if (this._byteLength === this._buffer.byteLength) {
      return;
    }
    const buf = new ArrayBuffer(this._byteLength);
    const dst = new Uint8Array(buf);
    const src = new Uint8Array(this._buffer, 0, dst.length);
    dst.set(src);
    this.buffer = buf;
  }

  seek(pos) {
    const npos = Math.max(0, Math.min(this.byteLength, pos));
    this.position = isNaN(npos) || !isFinite(npos) ? 0 : npos;
  }

  isEof() {
    return this.position >= this.byteLength;
  }

  mapInt32Array(length: number, e?: boolean): Int32Array {
    this._realloc(length * 4);
    const arr = new Int32Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 4;
    return arr;
  }

  mapInt16Array(length: number, e?: boolean): Int16Array {
    this._realloc(length * 2);
    const arr = new Int16Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 2;
    return arr;
  }


  mapInt8Array(length: number): Int8Array {
    this._realloc(length);
    const arr = new Int8Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    this.position += length;
    return arr;
  }

  mapUint32Array(length: number, e?: boolean): Uint32Array {
    this._realloc(length * 4);
    const arr = new Uint32Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 4;
    return arr;
  }

  mapUint16Array(length: number, e?: boolean): Uint16Array {
    this._realloc(length * 2);
    const arr = new Uint16Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 2;
    return arr;
  }

  mapUint8Array(length: number): Uint8Array {
    this._realloc(length);
    const arr = new Uint8Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    this.position += length;
    return arr;
  }

  // mapUint64Array(e, t) {
  //   this._realloc(8 * e);
  //   var n = new Uint64Array(this._buffer, this.byteOffset + this.position, e);
  //   return DataStream.arrayToNative(n, null == t ? this.endianness : t),
  //     this.position += 8 * e,
  //     n
  // }

  mapFloat64Array(length: number, e?: boolean): Float64Array {
    this._realloc(length * 8);
    const arr = new Float64Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 8;
    return arr;
  }

  mapFloat32Array(length: number, e?: boolean): Float32Array {
    this._realloc(length * 4);
    const arr = new Float32Array(
      this._buffer,
      this.byteOffset + this.position,
      length
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += length * 4;
    return arr;
  }

  readInt32Array(length: number, e?: boolean): Int32Array {
    length = length == null ? this.byteLength - this.position / 4 : length;
    const arr = new Int32Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }

  readInt16Array(length: number, e?: boolean): Int16Array {
    length = length == null ? this.byteLength - this.position / 2 : length;
    const arr = new Int16Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }

  readInt8Array(length: number): Int8Array {
    length = length == null ? this.byteLength - this.position : length;
    const arr = new Int8Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    this.position += arr.byteLength;
    return arr;
  }


  readUint32Array(length: number, e?: boolean): Uint32Array {
    length = length == null ? this.byteLength - this.position / 4 : length;
    const arr = new Uint32Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }

  readUint16Array(length: number, e?: boolean): Uint16Array {
    length = length == null ? this.byteLength - this.position / 2 : length;
    const arr = new Uint16Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }

  readUint8Array(length: number): Uint8Array {
    length = length == null ? this.byteLength - this.position : length;
    const arr = new Uint8Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    this.position += arr.byteLength;
    return arr;
  }

  // readUint64Array(e, t) {
  //   e = null == e ? this.byteLength - this.position / 8 : e;
  //   var n = new Uint64Array(e);
  //   return DataStream.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, e * n.BYTES_PER_ELEMENT),
  //     DataStream.arrayToNative(n, null == t ? this.endianness : t),
  //     this.position += n.byteLength,
  //     n
  // }

  readFloat64Array(length: number, e?: boolean): Float64Array {
    length = length == null ? this.byteLength - this.position / 8 : length;
    const arr = new Float64Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }


  readFloat32Array(length: number, e?: boolean): Float32Array {
    length = length == null ? this.byteLength - this.position / 4 : length;
    const arr = new Float32Array(length);
    DataStream.memcpy(
      arr.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * arr.BYTES_PER_ELEMENT
    );
    DataStream.arrayToNative(arr, e == null ? this.endianness : e);
    this.position += arr.byteLength;
    return arr;
  }

  writeInt32Array(arr: Int32Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 4);
    if (
      arr instanceof Int32Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapInt32Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeInt32(arr[i], e);
      }
    }
    return this;
  }

  writeInt16Array(arr: Int16Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 2);
    if (
      arr instanceof Int16Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapInt16Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeInt16(arr[i], e);
      }
    }
    return this;
  }

  writeInt8Array(arr: Int8Array | number[]): DataStream {
    this._realloc(arr.length);
    if (
      arr instanceof Int8Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapInt8Array(arr.length);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeInt8(arr[i]);
      }
    }
    return this;
  }

  writeUint32Array(arr: Uint32Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 4);
    if (
      arr instanceof Uint32Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapUint32Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeUint32(arr[i], e);
      }
    }
    return this;
  }

  writeUint16Array(arr: Uint16Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 2);
    if (
      arr instanceof Uint16Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapUint16Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeUint16(arr[i], e);
      }
    }
    return this;
  }

  writeUint8Array(arr: Uint8Array | number[]): DataStream {
    this._realloc(arr.length);
    if (
      arr instanceof Uint8Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapUint8Array(arr.length);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeUint8(arr[i]);
      }
    }
    return this;
  }

  // writeUint64Array(e, t) {
  //   if (this._realloc(8 * e.length),
  //     e instanceof Uint64Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0)
  //     DataStream.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength),
  //       this.mapUint64Array(e.length, t);
  //   else
  //     for (var n = 0; n < e.length; n++)
  //       this.writeUint64(e[n], t)
  // }

  writeFloat64Array(arr: Float64Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 8);
    if (
      arr instanceof Float64Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapFloat64Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeFloat64(arr[i], e);
      }
    }
    return this;
  }

  writeFloat32Array(arr: Float32Array | number[], e?: boolean): DataStream {
    this._realloc(arr.length * 4);
    if (
      arr instanceof Float32Array &&
      (this.byteOffset + this.position) % arr.BYTES_PER_ELEMENT === 0
    ) {
      DataStream.memcpy(
        this._buffer,
        this.byteOffset + this.position,
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      );
      this.mapFloat32Array(arr.length, e);
    } else {
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        this.writeFloat32(arr[i], e);
      }
    }
    return this;
  }

  readInt32(e?: boolean): number {
    const v = this._dataView.getInt32(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return v;
  }

  readInt16(e?: boolean): number {
    const v = this._dataView.getInt16(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 2;
    return v;
  }

  readInt8(): number {
    const v = this._dataView.getInt8(this.position);
    this.position += 1;
    return v;
  }

  readUint32(e?: boolean): number {
    const v = this._dataView.getUint32(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return v;
  }

  readUint16(e?: boolean): number {
    const v = this._dataView.getUint16(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 2;
    return v;
  }

  readUint8(): number {
    const v = this._dataView.getUint8(this.position);
    this.position += 1;
    return v;
  }

  readFloat32(e?: boolean): number {
    const v = this._dataView.getFloat32(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return v;
  }

  // Double ===
  // readUint64(e) {
  //   var t = this._dataView.getUint64(this.position, null == e ? this.endianness : e);
  //   return this.position += 8,
  //     t
  // }

  readFloat64(e?: boolean): number {
    const v = this._dataView.getFloat64(
      this.position,
      e == null ? this.endianness : e
    );
    this.position += 8;
    return v;
  }

  writeInt32(v: number, e?: boolean): DataStream {
    this._realloc(4);
    this._dataView.setInt32(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return this;
  }

  writeInt16(v: number, e?: boolean): DataStream {
    this._realloc(2);
    this._dataView.setInt16(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 2;
    return this;
  }

  writeInt8(v: number): DataStream {
    this._realloc(1);
    this._dataView.setInt8(this.position, v);
    this.position += 1;
    return this;
  }

  writeUint32(v: number, e?: boolean): DataStream {
    this._realloc(4);
    this._dataView.setUint32(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return this;
  }

  writeUint16(v: number, e?: boolean): DataStream {
    this._realloc(2);
    this._dataView.setUint16(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 2;
    return this;
  }

  writeUint8(v: number): DataStream {
    this._realloc(1);
    this._dataView.setUint8(this.position, v);
    this.position += 1;
    return this;
  }

  writeFloat32(v: number, e?: boolean): DataStream {
    this._realloc(4);
    this._dataView.setFloat32(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 4;
    return this;
  }

  // Double ===
  // writeUint64(e, t) {
  //   this._realloc(8),
  //     this._dataView.setUint64(this.position, e, null == t ? this.endianness : t),
  //     this.position += 8
  // }

  writeFloat64(v: number, e?: boolean): DataStream {
    this._realloc(8);
    this._dataView.setFloat64(
      this.position,
      v,
      e == null ? this.endianness : e
    );
    this.position += 8;
    return this;
  }

  readStruct(structDefinition: StructRead[]): object {
    const struct = {};
    let t: StructRead;
    let v;
    const p = this.position;
    for (let i = 0; i < structDefinition.length; i += 2) {
      t = structDefinition[i + 1];
      v = this.readType(t, struct);
      if (v == null) {
        if (this.failurePosition === 0) {
          this.failurePosition = this.position;
        }
        this.position = p;
        return null;
      }
      struct[structDefinition[i] as string] = v;
    }
    return struct;
  }

  readUCS2String(length: number, endianness?: boolean): string {
    return DataStream.createStringFromArray(
      this.readUint16Array(length, endianness)
    );
  }


  writeUCS2String(
    str: string,
    endianness?: boolean,
    lengthOverride?: number
  ): DataStream {
    if (lengthOverride == null) {
      lengthOverride = str.length;
    }
    let i = 0;
    for (; i < str.length && i < lengthOverride; i++) {
      this.writeUint16(str.charCodeAt(i), endianness);
    }
    for (; i < lengthOverride; i++) {
      this.writeUint16(0);
    }
    return this;
  }

  readString(length: number, encoding?: string): string {
    if (encoding == null || encoding === "ASCII") {
      return DataStream.createStringFromArray(
        this.mapUint8Array(
          length == null ? this.byteLength - this.position : length
        )
      );
    } else {
      return new TextDecoder(encoding).decode(this.mapUint8Array(length));
    }
  }

  static createStringFromArray(array: TypedArray) {
    const chunkSize = 0x8000;
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(
        String.fromCharCode.apply(
          null,
          array.subarray(i, i + chunkSize)
        )
      );
    }
    return chunks.join("");
  }

  writeString(s: string, encoding?: string, length?: number): DataStream {
    if (encoding == null || encoding === "ASCII") {
      if (length != null) {
        let i: number;
        const len = Math.min(s.length, length);
        for (i = 0; i < len; i++) {
          this.writeUint8(s.charCodeAt(i));
        }
        for (; i < length; i++) {
          this.writeUint8(0);
        }
      } else {
        for (let i = 0; i < s.length; i++) {
          this.writeUint8(s.charCodeAt(i));
        }
      }
    } else {
      this.writeUint8Array(
        new TextEncoder(encoding).encode(s.substring(0, length))
      );
    }
    return this;
  }

  readCString(length?: number): string {
    const blen = this.byteLength - this.position;
    const u8 = new Uint8Array(
      this._buffer,
      this._byteOffset + this.position
    );
    let len = blen;
    if (length != null) {
      len = Math.min(length, blen);
    }
    let i = 0;
    for (; i < len && u8[i] !== 0; i++) {
      // find first zero byte
    }
    const s = DataStream.createStringFromArray(this.mapUint8Array(i));
    if (length != null) {
      this.position += len - i;
    } else if (i !== blen) {
      this.position += 1; // trailing zero if not at end of buffer
    }
    return s;
  }


  writeCString(e, t) {
    var n = 0;
    if (null != t) {
      var i = Math.min(e.length, t);
      for (n = 0; n < i; n++)
        this.writeUint8(e.charCodeAt(n));
      for (; n < t; n++)
        this.writeUint8(0)
    } else {
      for (n = 0; n < e.length; n++)
        this.writeUint8(e.charCodeAt(n));
      this.writeUint8(0)
    }
  }

  // readType(e, t) {
  //   if ("function" == typeof e)
  //     return e(this, t);
  //   if (!("object" != typeof e || e instanceof Array))
  //     return e.get(this, t);
  //   if (e instanceof Array && 3 != e.length)
  //     return this.readStruct(e, t);
  //   var n, i = null, o = 0, r = null, a = "ASCII", s = this.position;
  //   switch ("string" == typeof e && /:/.test(e) && (n = e.split(":"),
  //     e = n[0],
  //     r = parseInt(n[1], 10)),
  //   "string" == typeof e && /,/.test(e) && (n = e.split(","),
  //     e = n[0],
  //     a = parseInt(n[1], 10)),
  //   e) {
  //     case "uint8":
  //       i = this.readUint8();
  //       break;
  //     case "int8":
  //       i = this.readInt8();
  //       break;
  //     case "uint16":
  //       i = this.readUint16(this.endianness);
  //       break;
  //     case "int16":
  //       i = this.readInt16(this.endianness);
  //       break;
  //     case "uint32":
  //       i = this.readUint32(this.endianness);
  //       break;
  //     case "int32":
  //       i = this.readInt32(this.endianness);
  //       break;
  //     case "float32":
  //       i = this.readFloat32(this.endianness);
  //       break;
  //     case "uint64":
  //       i = this.readUint64(this.endianness);
  //       break;
  //     case "float64":
  //       i = this.readFloat64(this.endianness);
  //       break;
  //     case "uint16be":
  //       i = this.readUint16(DataStream.BIG_ENDIAN);
  //       break;
  //     case "int16be":
  //       i = this.readInt16(DataStream.BIG_ENDIAN);
  //       break;
  //     case "uint32be":
  //       i = this.readUint32(DataStream.BIG_ENDIAN);
  //       break;
  //     case "int32be":
  //       i = this.readInt32(DataStream.BIG_ENDIAN);
  //       break;
  //     case "float32be":
  //       i = this.readFloat32(DataStream.BIG_ENDIAN);
  //       break;
  //     case "float64be":
  //       i = this.readFloat64(DataStream.BIG_ENDIAN);
  //       break;
  //     case "uint64be":
  //       i = this.readUint64(DataStream.BIG_ENDIAN);
  //       break;
  //     case "uint16le":
  //       i = this.readUint16(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "int16le":
  //       i = this.readInt16(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "uint32le":
  //       i = this.readUint32(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "int32le":
  //       i = this.readInt32(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "float32le":
  //       i = this.readFloat32(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "float64le":
  //       i = this.readFloat64(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "uint64le":
  //       i = this.readUint64(DataStream.LITTLE_ENDIAN);
  //       break;
  //     case "cstring":
  //       i = this.readCString(r);
  //       break;
  //     case "string":
  //       i = this.readString(r, a);
  //       break;
  //     case "u16string":
  //       i = this.readUCS2String(r, this.endianness),
  //         null != r && (r *= 2);
  //       break;
  //     case "u16stringle":
  //       i = this.readUCS2String(r, DataStream.LITTLE_ENDIAN),
  //         null != r && (r *= 2);
  //       break;
  //     case "u16stringbe":
  //       i = this.readUCS2String(r, DataStream.BIG_ENDIAN),
  //         null != r && (r *= 2);
  //       break;
  //     default:
  //       if (3 == e.length) {
  //         var c, l = e[1], u = e[2], p = 0;
  //         if (p = "function" == typeof u ? u(t, this, e) : "string" == typeof u && null != t[u] ? parseInt(t[u], 10) : parseInt(u, 10),
  //           "string" == typeof l) {
  //           var h = l.replace(/(le|be)$/, "")
  //             , d = null;
  //           switch (/le$/.test(l) ? d = DataStream.LITTLE_ENDIAN : /be$/.test(l) && (d = DataStream.BIG_ENDIAN),
  //           "*" == u && (p = null),
  //           h) {
  //             case "uint8":
  //               i = this.readUint8Array(p);
  //               break;
  //             case "uint16":
  //               i = this.readUint16Array(p, d);
  //               break;
  //             case "uint32":
  //               i = this.readUint32Array(p, d);
  //               break;
  //             case "int8":
  //               i = this.readInt8Array(p);
  //               break;
  //             case "int16":
  //               i = this.readInt16Array(p, d);
  //               break;
  //             case "int32":
  //               i = this.readInt32Array(p, d);
  //               break;
  //             case "float32":
  //               i = this.readFloat32Array(p, d);
  //               break;
  //             case "float64":
  //               i = this.readFloat64Array(p, d);
  //               break;
  //             case "uint64":
  //               i = this.readUint64Array(p, d);
  //               break;
  //             case "cstring":
  //             case "utf16string":
  //             case "string":
  //               if (null == p)
  //                 for (i = []; !this.isEof() && null != (c = this.readType(l, t));)
  //                   i.push(c);
  //               else
  //                 for (i = new Array(p),
  //                   o = 0; o < p; o++)
  //                   i[o] = this.readType(l, t)
  //           }
  //         } else if ("*" == u)
  //           for (i = [],
  //             this.buffer; ;) {
  //             var m = this.position;
  //             try {
  //               var f = this.readType(l, t);
  //               if (null == f) {
  //                 this.position = m;
  //                 break
  //               }
  //               i.push(f)
  //             } catch (e) {
  //               // throw e
  //               console.error(e)
  //               this.position = m;
  //               break
  //             }
  //           }
  //         else
  //           for (i = new Array(p),
  //             o = 0; o < p; o++) {
  //             if (null == (c = this.readType(l, t)))
  //               return null;
  //             i[o] = c
  //           }
  //         break
  //       }
  //   }
  //   return null != r && (this.position = s + r),
  //     i
  // }

  readType(t: StructRead, struct: object): any {
    if (typeof t === "function") {
      return t(this, struct);
    } else if (typeof t === "object" && !(t instanceof Array)) {
      return t.get(this, struct);
    } else if (t instanceof Array && t.length !== 3) {
      return this.readStruct(t as StructRead[]);
    }
    let v = null;
    let lengthOverride = null;
    let charset = "ASCII";
    const pos = this.position;
    if (typeof t === "string" && /:/.test(t)) {
      const tp = t.split(":");
      t = tp[0];
      const len = tp[1];

      // allow length to be previously parsed variable
      // e.g. 'string:fieldLength', if `fieldLength` has been parsed previously.
      // else, assume literal integer e.g., 'string:4'
      lengthOverride = parseInt(
        struct[len] != null ? struct[len] : len,
        10
      );
    }
    if (typeof t === "string" && /,/.test(t)) {
      const tp = t.split(",");
      t = tp[0];
      charset = tp[1];
    }
    switch (t) {
      case "uint8":
        v = this.readUint8();
        break;
      case "int8":
        v = this.readInt8();
        break;

      case "uint16":
        v = this.readUint16(this.endianness);
        break;
      case "int16":
        v = this.readInt16(this.endianness);
        break;
      case "uint32":
        v = this.readUint32(this.endianness);
        break;
      case "int32":
        v = this.readInt32(this.endianness);
        break;
      case "float32":
        v = this.readFloat32(this.endianness);
        break;
      case "float64":
        v = this.readFloat64(this.endianness);
        break;

      case "uint16be":
        v = this.readUint16(DataStream.BIG_ENDIAN);
        break;
      case "int16be":
        v = this.readInt16(DataStream.BIG_ENDIAN);
        break;
      case "uint32be":
        v = this.readUint32(DataStream.BIG_ENDIAN);
        break;
      case "int32be":
        v = this.readInt32(DataStream.BIG_ENDIAN);
        break;
      case "float32be":
        v = this.readFloat32(DataStream.BIG_ENDIAN);
        break;
      case "float64be":
        v = this.readFloat64(DataStream.BIG_ENDIAN);
        break;

      case "uint16le":
        v = this.readUint16(DataStream.LITTLE_ENDIAN);
        break;
      case "int16le":
        v = this.readInt16(DataStream.LITTLE_ENDIAN);
        break;
      case "uint32le":
        v = this.readUint32(DataStream.LITTLE_ENDIAN);
        break;
      case "int32le":
        v = this.readInt32(DataStream.LITTLE_ENDIAN);
        break;
      case "float32le":
        v = this.readFloat32(DataStream.LITTLE_ENDIAN);
        break;
      case "float64le":
        v = this.readFloat64(DataStream.LITTLE_ENDIAN);
        break;

      case "cstring":
        v = this.readCString(lengthOverride);
        break;

      case "string":
        v = this.readString(lengthOverride, charset);
        break;

      case "u16string":
        v = this.readUCS2String(lengthOverride, this.endianness);
        break;

      case "u16stringle":
        v = this.readUCS2String(
          lengthOverride,
          DataStream.LITTLE_ENDIAN
        );
        break;

      case "u16stringbe":
        v = this.readUCS2String(lengthOverride, DataStream.BIG_ENDIAN);
        break;

      default:
        if (t.length === 3) {
          const ta = t[1] as string;
          const len = t[2];
          let length = 0;
          if (typeof len === "function") {
            length = len(struct, this, t);
          } else if (typeof len === "string" && struct[len] != null) {
            length = parseInt(struct[len], 10);
          } else {
            length = parseInt(len as string, 10);
          }
          if (typeof ta === "string") {
            const tap = ta.replace(/(le|be)$/, "");
            let endianness = null;
            if (/le$/.test(ta)) {
              endianness = DataStream.LITTLE_ENDIAN;
            } else if (/be$/.test(ta)) {
              endianness = DataStream.BIG_ENDIAN;
            }
            if (len === "*") {
              length = null;
            }
            switch (tap) {
              case "uint8":
                v = this.readUint8Array(length);
                break;
              case "uint16":
                v = this.readUint16Array(length, endianness);
                break;
              case "uint32":
                v = this.readUint32Array(length, endianness);
                break;
              case "int8":
                v = this.readInt8Array(length);
                break;
              case "int16":
                v = this.readInt16Array(length, endianness);
                break;
              case "int32":
                v = this.readInt32Array(length, endianness);
                break;
              case "float32":
                v = this.readFloat32Array(length, endianness);
                break;
              case "float64":
                v = this.readFloat64Array(length, endianness);
                break;
              case "cstring":
              case "utf16string":
              case "string":
                if (length == null) {
                  v = [];
                  while (!this.isEof()) {
                    const u = this.readType(ta, struct);
                    if (u == null) break;
                    v.push(u);
                  }
                } else {
                  v = new Array(length);
                  for (let i = 0; i < length; i++) {
                    v[i] = this.readType(ta, struct);
                  }
                }
                break;
            }
          } else {
            if (len === "*") {
              v = [];
              while (true) {
                const p = this.position;
                try {
                  const o = this.readType(ta, struct);
                  if (o == null) {
                    this.position = p;
                    break;
                  }
                  v.push(o);
                } catch (e) {
                  this.position = p;
                  break;
                }
              }
            } else {
              v = new Array(length);
              for (let i = 0; i < length; i++) {
                const u = this.readType(ta, struct);
                if (u == null) return null;
                v[i] = u;
              }
            }
          }
          break;
        }
    }
    if (lengthOverride != null) {
      this.position = pos + lengthOverride;
    }
    return v;
  }

  writeStruct(
    structDefinition: StructWrite[] | StructRead[],
    struct: object,
    needConvertStructDef: boolean = false
  ): DataStream {
    if (needConvertStructDef) {
      structDefinition = DataStream.defWriteStruct(
        structDefinition as StructRead[],
        struct
      );
    }
    for (let i = 0; i < structDefinition.length; i += 2) {
      const t = structDefinition[i + 1];
      this.writeType(
        t as StructWrite,
        struct[structDefinition[i] as string],
        struct
      );
    }
    return this;
  }

  writeType(e, t, n) {
    if ("function" == typeof e)
      return e(this, t);
    if ("object" == typeof e && !(e instanceof Array))
      return e.set(this, t, n);
    var i, o = null, r = "ASCII", a = this.position;
    switch ("string" == typeof e && /:/.test(e) && (i = e.split(":"),
      e = i[0],
      o = parseInt(i[1], 10)),
    "string" == typeof e && /,/.test(e) && (i = e.split(","),
      e = i[0],
      r = parseInt(i[1], 10)),
    e) {
      case "uint8":
        this.writeUint8(t);
        break;
      case "int8":
        this.writeInt8(t);
        break;
      case "uint16":
        this.writeUint16(t, this.endianness);
        break;
      case "int16":
        this.writeInt16(t, this.endianness);
        break;
      case "uint32":
        this.writeUint32(t, this.endianness);
        break;
      case "int32":
        this.writeInt32(t, this.endianness);
        break;
      case "float32":
        this.writeFloat32(t, this.endianness);
        break;
      case "float64":
        this.writeFloat64(t, this.endianness);
        break;
      case "uint64":
        this.writeUint64(t, this.endianness);
        break;
      case "uint16be":
        this.writeUint16(t, DataStream.BIG_ENDIAN);
        break;
      case "int16be":
        this.writeInt16(t, DataStream.BIG_ENDIAN);
        break;
      case "uint32be":
        this.writeUint32(t, DataStream.BIG_ENDIAN);
        break;
      case "int32be":
        this.writeInt32(t, DataStream.BIG_ENDIAN);
        break;
      case "float32be":
        this.writeFloat32(t, DataStream.BIG_ENDIAN);
        break;
      case "float64be":
        this.writeFloat64(t, DataStream.BIG_ENDIAN);
        break;
      case "uint64be":
        this.writeUint64(t, DataStream.BIG_ENDIAN);
        break;
      case "uint16le":
        this.writeUint16(t, DataStream.LITTLE_ENDIAN);
        break;
      case "int16le":
        this.writeInt16(t, DataStream.LITTLE_ENDIAN);
        break;
      case "uint32le":
        this.writeUint32(t, DataStream.LITTLE_ENDIAN);
        break;
      case "int32le":
        this.writeInt32(t, DataStream.LITTLE_ENDIAN);
        break;
      case "float32le":
        this.writeFloat32(t, DataStream.LITTLE_ENDIAN);
        break;
      case "float64le":
        this.writeFloat64(t, DataStream.LITTLE_ENDIAN);
        break;
      case "uint64le":
        this.writeUint64(t, DataStream.LITTLE_ENDIAN);
        break;
      case "cstring":
        this.writeCString(t, o),
          o = null;
        break;
      case "string":
        this.writeString(t, r, o),
          o = null;
        break;
      case "u16string":
        this.writeUCS2String(t, this.endianness, o),
          o = null;
        break;
      case "u16stringle":
        this.writeUCS2String(t, DataStream.LITTLE_ENDIAN, o),
          o = null;
        break;
      case "u16stringbe":
        this.writeUCS2String(t, DataStream.BIG_ENDIAN, o),
          o = null;
        break;
      default:
        if (3 == e.length) {
          for (var s = e[1], c = 0; c < t.length; c++)
            this.writeType(s, t[c]);
          break
        }
        this.writeStruct(e, t)
    }
    null != o && (this.position = a,
      this._realloc(o),
      this.position = a + o)
  }

  static memcpy(
    dst: ArrayBufferLike,
    dstOffset: number,
    src: ArrayBuffer,
    srcOffset: number,
    byteLength: number
  ) {
    const dstU8 = new Uint8Array(dst, dstOffset, byteLength);
    const srcU8 = new Uint8Array(src, srcOffset, byteLength);
    dstU8.set(srcU8);
  }


  // static arrayToNative(e, t) {
  //   return t == this.endianness ? e : this.flipArrayEndianness(e)
  // }

  static arrayToNative(array, arrayIsLittleEndian: boolean) {
    if (arrayIsLittleEndian === this.endianness) {
      return array;
    } else {
      return this.flipArrayEndianness(array); // ???
    }
  }

  static nativeToEndian(array: TypedArray, littleEndian: boolean) {
    if (this.endianness === littleEndian) {
      return array;
    } else {
      return this.flipArrayEndianness(array);
    }
  }

  static flipArrayEndianness(array: TypedArray) {
    const u8 = new Uint8Array(
      array.buffer,
      array.byteOffset,
      array.byteLength
    );
    for (let i = 0; i < array.byteLength; i += array.BYTES_PER_ELEMENT) {
      for (
        // tslint:disable-next-line one-variable-per-declaration
        let j = i + array.BYTES_PER_ELEMENT - 1, k = i;
        j > k;
        j--, k++
      ) {
        const tmp = u8[k];
        u8[k] = u8[j];
        u8[j] = tmp;
      }
    }
    return array;
  }
}

export default DataStream



