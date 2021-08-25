import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};





export type CompleteOrderError_PaymentFailed = {
  __typename?: 'CompleteOrderError_PaymentFailed';
  failureReason: Scalars['String'];
};

export type CompleteOrderError_SeatsUnavailable = {
  __typename?: 'CompleteOrderError_SeatsUnavailable';
  seatsUnavailable: Array<Seat>;
  seatsAvailable: Array<Seat>;
};

export type CompleteOrderInput = {
  clientMutationId: Scalars['ID'];
  orderId: Scalars['ID'];
  paymentNonce: Scalars['String'];
};

export type CompleteOrderResult = CompleteOrderSuccess | CompleteOrderError_SeatsUnavailable | CompleteOrderError_PaymentFailed;

export type CompleteOrderSuccess = {
  __typename?: 'CompleteOrderSuccess';
  order: Order;
  confirmationCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeOrder: CompleteOrderResult;
};


export type MutationCompleteOrderArgs = {
  input: CompleteOrderInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
};

export type Seat = {
  __typename?: 'Seat';
  id: Scalars['ID'];
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CompleteOrderError_PaymentFailed: ResolverTypeWrapper<CompleteOrderError_PaymentFailed>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CompleteOrderError_SeatsUnavailable: ResolverTypeWrapper<CompleteOrderError_SeatsUnavailable>;
  CompleteOrderInput: CompleteOrderInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CompleteOrderResult: ResolversTypes['CompleteOrderSuccess'] | ResolversTypes['CompleteOrderError_SeatsUnavailable'] | ResolversTypes['CompleteOrderError_PaymentFailed'];
  CompleteOrderSuccess: ResolverTypeWrapper<CompleteOrderSuccess>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  Seat: ResolverTypeWrapper<Seat>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CompleteOrderError_PaymentFailed: CompleteOrderError_PaymentFailed;
  String: Scalars['String'];
  CompleteOrderError_SeatsUnavailable: CompleteOrderError_SeatsUnavailable;
  CompleteOrderInput: CompleteOrderInput;
  ID: Scalars['ID'];
  CompleteOrderResult: ResolversParentTypes['CompleteOrderSuccess'] | ResolversParentTypes['CompleteOrderError_SeatsUnavailable'] | ResolversParentTypes['CompleteOrderError_PaymentFailed'];
  CompleteOrderSuccess: CompleteOrderSuccess;
  Mutation: {};
  Order: Order;
  Seat: Seat;
  Boolean: Scalars['Boolean'];
}>;

export type CompleteOrderError_PaymentFailedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompleteOrderError_PaymentFailed'] = ResolversParentTypes['CompleteOrderError_PaymentFailed']> = ResolversObject<{
  failureReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompleteOrderError_SeatsUnavailableResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompleteOrderError_SeatsUnavailable'] = ResolversParentTypes['CompleteOrderError_SeatsUnavailable']> = ResolversObject<{
  seatsUnavailable?: Resolver<Array<ResolversTypes['Seat']>, ParentType, ContextType>;
  seatsAvailable?: Resolver<Array<ResolversTypes['Seat']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompleteOrderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompleteOrderResult'] = ResolversParentTypes['CompleteOrderResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CompleteOrderSuccess' | 'CompleteOrderError_SeatsUnavailable' | 'CompleteOrderError_PaymentFailed', ParentType, ContextType>;
}>;

export type CompleteOrderSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompleteOrderSuccess'] = ResolversParentTypes['CompleteOrderSuccess']> = ResolversObject<{
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  confirmationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  completeOrder?: Resolver<ResolversTypes['CompleteOrderResult'], ParentType, ContextType, RequireFields<MutationCompleteOrderArgs, 'input'>>;
}>;

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Order']>, { __typename: 'Order' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;

  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SeatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Seat'] = ResolversParentTypes['Seat']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CompleteOrderError_PaymentFailed?: CompleteOrderError_PaymentFailedResolvers<ContextType>;
  CompleteOrderError_SeatsUnavailable?: CompleteOrderError_SeatsUnavailableResolvers<ContextType>;
  CompleteOrderResult?: CompleteOrderResultResolvers<ContextType>;
  CompleteOrderSuccess?: CompleteOrderSuccessResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Seat?: SeatResolvers<ContextType>;
}>;

