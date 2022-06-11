//
// Created by Osei Fortune on 10/06/2022.
//

#ifndef MMKV_CORE_MMKVIMPL_H
#define MMKV_CORE_MMKVIMPL_H

#include "Common.h"
#include "Caches.h"
#include "Helpers.h"
#include "MMKV.h"

class MMKVImpl {
public:
    MMKVImpl(MMKV* mmkv);

    static void Init(v8::Isolate *isolate);

    static MMKVImpl *GetPointer(v8::Local<v8::Object> object);

    static v8::Local<v8::FunctionTemplate> GetCtor(v8::Isolate *isolate);

    static void Initialize(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Create(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Contains(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Set(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void GetBoolean(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void GetString(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void GetNumber(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void GetBytes(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Delete(const v8::FunctionCallbackInfo<v8::Value> &args);

private:
    MMKV* mmkv_;

};


#endif //MMKV_CORE_MMKVIMPL_H