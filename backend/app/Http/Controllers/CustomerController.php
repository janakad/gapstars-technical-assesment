<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class CustomerController
 * @package App\Http\Controllers
 */
class CustomerController extends Controller
{
    protected $customer;

    /**
     * CustomerController constructor.
     * @param CustomerRepository $customerRepository
     */
    function __construct(CustomerRepository $customerRepository)
    {
        $this->customer = $customerRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request): Response
    {
        return response($this->customer->selectAll($request->except('page')), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        $this->validate($request, [
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'email' => 'string|max:255',
            'mobile' => 'string|max:20',
            'telephone' => 'string|max:20',
        ]);


        $customer = $this->customer->insert($request->all());

        if ($customer) {
            return response($customer, 201);
        } else {
            return response(new \Error('Something went wrong.'), 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param Customer $customer
     * @return Response
     */
    public function show(Customer $customer): Response
    {
        return response($customer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Customer $customer
     * @return Response
     */
    public function update(Request $request, Customer $customer): Response
    {
        $this->validate($request, [
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'email' => 'string|max:255',
            'mobile' => 'string|max:20',
            'telephone' => 'string|max:20',
        ]);

        return response($customer->update($request->all()), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Customer $customer
     * @return Response
     */
    public function destroy(Customer $customer): Response
    {
        return response($customer->delete(), 200);
    }
}
